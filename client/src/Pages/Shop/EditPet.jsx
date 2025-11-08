import React from 'react'
import NavBar from '../../Components/NavBar'
import Form from '../../Components/Form'
import { pet } from '../../Utils/Form'

const EditPet = () => {
  return (
    <>
        <NavBar />
        <div id="container">
            <div id="navigation">
          <button>back</button>
        </div>
            <input type="file" name="" id="" />
            <Form array={pet}/>
        </div>
    </>
  )
}

export default EditPet