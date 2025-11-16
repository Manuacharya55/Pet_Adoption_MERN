import React from 'react'
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import Card from '../../Components/Card'

const Wishlist = () => {
  return (
    <>
    <div id="container">
        <h1 id="heading">
            Your Wishlist
        </h1>
        <div id="card-holder">
            <Card >
                <div className="price-holder">
                    <span className="pet-category">
                        rabbit
                    </span>
                    <span className="price">
                        200$
                    </span>
                </div>
                <div className="btn-holder">
                    <button>remove</button>
                    <button>more details</button>
                </div>
            </Card>
            <Card >
                <div className="price-holder">
                    <span className="pet-category">
                        rabbit
                    </span>
                    <span className="price">
                        200$
                    </span>
                </div>
                <div className="btn-holder">
                    <button>remove</button>
                    <button>more details</button>
                </div>
            </Card>
            <Card >
                <div className="price-holder">
                    <span className="pet-category">
                        rabbit
                    </span>
                    <span className="price">
                        200$
                    </span>
                </div>
                <div className="btn-holder">
                    <button>remove</button>
                    <button>more details</button>
                </div>
            </Card>
        </div>
    </div>

    </>
  )
}

export default Wishlist