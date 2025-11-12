import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Button from "../../Components/ui/Button";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "password must be atleast 6 characters"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();

  const myFunc = async (data) => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    reset()
    navigate("/homepage")
  };
  return (
    <div className="auth">
      <div className="auth-image">
        <img src={"auth-image.jpg"} alt="" />
      </div>
      <div className="auth-form">
        <h1 id="title">Sign In</h1>
        <form onSubmit={handleSubmit(myFunc)}>
          <input type="text" placeholder="enter your email" {...register("email")}/>
          {errors?.email && <span className="error">{errors.email.message}</span>}
          <input type="text" placeholder="enter your password" {...register("password")}/>
          {errors?.password && <span className="error">{errors.password.message}</span>}
          <Button
            buttonName="sign in"
            type="main"
            isSubmitting={isSubmitting}
          />
        </form>

        <span>
          don't have an account ? <NavLink to="/register">Sign Up</NavLink>
        </span>
      </div>
    </div>
  );
};

export default Login;
