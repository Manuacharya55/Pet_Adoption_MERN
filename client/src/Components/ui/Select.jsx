import React, { useState } from 'react'

const Select = () => {
    const [open,setOpen] = useState(false);
    const [option,setOption] = useState("please select an option");
    const handleClick = (e) =>{
        console.log(e.target)
        setOption(e.target.toString())
        setOpen(false)
    }
  return (
    <div className="select">
        <span>name</span>
        <div className="selected" onClick={()=> setOpen(!open)}>
            {option}
        </div>
        <div className={`options ${open ? "active" : ""}`}>
            <div className='option' onClick={handleClick}>item 1</div>
            <div className='option' onClick={handleClick}>item 2</div>
            <div className='option' onClick={handleClick}>item 3</div>
        </div>
    </div>
  )
}

export default Select