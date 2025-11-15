import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../Components/ui/Button";
import { usePost } from "../../hooks/apiRequests";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";

const registerSchema = z.object({
  fullname: z.string().min(2, "Name must have atleast 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "password must be atleast 6 characters"),
});

const url = `/auth/register`;

const Register = () => {
  const { setToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate();

  const myFunc = async (data) => {
    const response = await usePost(url, "", data);
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

        <form onSubmit={handleSubmit(myFunc)}>
          <input
            type="text"
            placeholder="enter your fullname"
            {...register("fullname")}
          />
          {errors?.fullname && (
            <span className="error">{errors.fullname.message}</span>
          )}
          <input
            type="text"
            placeholder="enter your email"
            {...register("email")}
          />
          {errors?.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <input
            type="text"
            placeholder="enter your password"
            {...register("password")}
          />
          {errors?.password && (
            <span className="error">{errors.password.message}</span>
          )}
          <Button
            buttonName="sign up"
            type="main"
            isSubmitting={isSubmitting}
          />
        </form>
        <span id="auth-nav">
          already have an account ? <NavLink to="/login">Sign in</NavLink>
        </span>
      </div>
    </div>
  );
};

export default Register;
