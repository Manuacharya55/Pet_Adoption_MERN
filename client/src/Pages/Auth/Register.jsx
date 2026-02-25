import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../../hooks/apiRequests";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";
import { registerSchema } from "../../Schema/AuthSchema";
import RegisterForm from "../../form/RegisterForm";

const Register = () => {
  const { setToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await usePost("/auth/register", "", data);
    if (response.success) {
      toast.success(response.message);
      setToken(response.data);
      navigate("/add-address");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="auth">
      <div className="auth-image">
        <img src={"auth-image.jpg"} alt="" />
      </div>
      <div className="auth-form">
        <h1 id="title">Sign Up</h1>
        <RegisterForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
        />
        <span id="auth-nav">
          already have an account ? <NavLink to="/login">Sign in</NavLink>
        </span>
      </div>
    </div>
  );
};

export default Register;
