import React from 'react'
import Form from "../../Components/Form"
import { NavLink } from 'react-router-dom'
import { registerUser } from '../../Utils/Form'

const Register = () => {
  return (
    <div className="auth">
        <div className="auth-image">
            <img src={"auth-image.jpg"} alt="" />
        </div>
        <div className="auth-form">
            <h1 id="title">
                Sign Up
            </h1>

            <Form array={registerUser}/>
            <span>already have an account ? <NavLink to="/login">Sign in</NavLink></span>
        </div>
    </div>
  )
}

export default Register