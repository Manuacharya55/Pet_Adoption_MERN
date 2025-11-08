import React from 'react'
import Form from '../../Components/Form'
import { address } from '../../Utils/Form'

const Address = () => {
  return (
    <div className="address">
        <div className="address-map">
            <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="" />
        </div>
        <div className="address-form">
            <h1 id="title">Add Address</h1>
            <Form array={address}/>
        </div>
    </div>
  )
}

export default Address