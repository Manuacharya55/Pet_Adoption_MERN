import React from 'react'

const Card = ({heading="pet name",children,img="kitty.jpg"}) => {
  return (
    <div className="card">
        <img src={img} alt="" />
        <span className="card-heading">
            {heading}
        </span>
        {children}
    </div>
  )
}

export default Card;