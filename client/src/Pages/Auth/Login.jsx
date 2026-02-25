import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../../hooks/apiRequests";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { loginSchema } from "../../Schema/AuthSchema";
import LoginForm from "../../form/LoginForm";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();
  const { setToken } = useAuth();

  const onSubmit = async (data) => {
    const response = await usePost("/auth/login", "", data);
    if (response?.success) {
      toast.success(response.message);
      setToken(response.data);

      const { role } = response.data;
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "shopkeeper") navigate("/shopkeeper/dashboard");
      else navigate("/home");
    } else {
      toast.error(response.message);
      reset();
    }
  };

  return (
    <div className="auth">
      <div className="auth-image">
        <img src={"auth-image.jpg"} alt="" />
      </div>
      <div className="auth-form">
        <h1 id="title">Sign In</h1>
        <LoginForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
        />
        <span>
          don't have an account ? <NavLink to="/register">Sign Up</NavLink>
        </span>
      </div>
    </div>
  );
};

export default Login;
