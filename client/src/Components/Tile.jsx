import React from 'react'

const Tile = ({count="0",name}) => {
  return (
    <div className="tile">
        <span className="number">{count}</span>
        <span className="text">{name}</span>
    </div>
  )
}

export default Tile