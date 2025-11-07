import React from 'react'

const Card = ({heading="pet name",children}) => {
  return (
    <div className="card">
        <img src="kitty.jpg" alt="" />
        <span className="card-heading">
            {heading}
        </span>
        {children}
    </div>
  )
}

export default Card;