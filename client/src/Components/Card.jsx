import React from 'react'

const Card = ({ heading = "pet name", children, img = "kitty.jpg", className = "" }) => {
  return (
    <div className={`card ${className}`}>
      <img src={img} alt="" />
      <span className="card-heading">
        {heading}
      </span>
      {children}
    </div>
  )
}

export default Card;