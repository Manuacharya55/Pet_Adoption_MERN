import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../Components/ui/Button";
import axios from "axios";


const registerSchema = z.object({
  fullname: z.string().min(2, "Name must have atleast 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "password must be atleast 6 characters"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate()
  const myFunc = async (data) => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/register",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    navigate("/add-address")
    reset();
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
