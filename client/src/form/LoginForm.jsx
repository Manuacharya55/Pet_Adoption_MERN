import React from "react";
import Input from "../Components/ui/Input";
import Button from "../Components/ui/Button";

const LoginForm = ({ register, handleSubmit, onSubmit, errors, isSubmitting, onFillDemo }) => {
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

            <button
                type="button"
                onClick={onFillDemo}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '12px',
                    background: 'transparent',
                    border: '1.5px dashed var(--accent-primary)',
                    borderRadius: '8px',
                    color: 'var(--accent-primary)',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    letterSpacing: '0.02em',
                    transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--accent-primary)';
                    e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--accent-primary)';
                }}
            >
                🚀 Fill Demo Data
            </button>

            <Button buttonName="Sign In" type="main" isSubmitting={isSubmitting} />
        </form>
    );
};

export default LoginForm;
