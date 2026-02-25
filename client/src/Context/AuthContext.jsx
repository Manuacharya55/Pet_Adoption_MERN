import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const setToken = (data) => {
        const { role, token } = data;
        const userData = { role, token };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const getToken = () => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Error parsing user from localStorage", error);
        } finally {
            setLoading(false);
        }
    };

    const clearToken = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <AuthContext.Provider value={{ setToken, user, clearToken, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Outside context")
    }

    return context
}