import React from 'react'

const Button = ({buttonName,handleClick,type}) => {
  return (
    <button onClick={handleClick} className={type}>{buttonName}</button>
  )
}

export default Button