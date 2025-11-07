import React from 'react'
import Form from '../../Components/Form'
import { NavLink } from 'react-router-dom'
import { loginUser } from '../../Utils/Form'

const Login = () => {
  return (
    <div className="auth">
        <div className="auth-image">
            <img src={"auth-image.jpg"} alt="" />
        </div>
        <div className="auth-form">
            <h1 id="title">
                Sign In
            </h1>

            <Form array={loginUser}/>
            <span>don't have an account ? <NavLink to="/register">Sign Up</NavLink></span>
        </div>
    </div>
  )
}

export default Login