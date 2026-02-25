import React from "react";
import Input from "../Components/ui/Input";
import Button from "../Components/ui/Button";

const RegisterForm = ({
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
}) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Full Name"
                placeholder="Enter your fullname"
                {...register("fullname")}
                error={errors.fullname}
            />

            <Input
                label="Email Address"
                placeholder="Enter your email"
                {...register("email")}
                error={errors.email}
            />

            <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                error={errors.password}
            />

            <Button buttonName="Sign Up" type="main" isSubmitting={isSubmitting} />
        </form>
    );
};

export default RegisterForm;
