import React from "react";
import Input from "../Components/ui/Input";
import Button from "../Components/ui/Button";

const LoginForm = ({ register, handleSubmit, onSubmit, errors, isSubmitting }) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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

            <Button buttonName="Sign In" type="main" isSubmitting={isSubmitting} />
        </form>
    );
};

export default LoginForm;
