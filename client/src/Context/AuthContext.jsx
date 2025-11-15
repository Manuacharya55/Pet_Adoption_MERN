import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);

    const setToken = (data) =>{
        const {role,token} = data;
        localStorage.setItem("user",JSON.stringify({role,token}))
        console.log(data)
    }

    const getToken = () =>{
        const user = JSON.parse(localStorage.getItem("user")) || null;
        setUser(user)
    }

    const clearToken = () =>{
        localStorage.clear("user")
    }

    useEffect(()=>{
        getToken()
    },[]);

    return <AuthContext.Provider value={{setToken,user,clearToken}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () =>{
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("Outside context")
    }

    return context
}