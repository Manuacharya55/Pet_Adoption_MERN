import React from 'react'
import NavBar from '../../Components/NavBar'
import Select from '../../Components/ui/Select'
import Card from '../../Components/Card'
import Footer from '../../Components/Footer'

const PetsPage = () => {
  return (
    <>
    <NavBar />
    <div id="container">
        <div id="filter-holder">
            <Select/>
            <Select/>
            <Select/>
            <Select/>
        </div>

        <h1 id="heading">
            Shop by pets
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
                    <button>add to wishlist</button>
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
                    <button>add to wishlist</button>
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
                    <button>add to wishlist</button>
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
                    <button>add to wishlist</button>
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
                    <button>add to wishlist</button>
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
                        <button>add to wishlist</button>
                        <button>more details</button>
                    </div>
                </Card>
        </div>
    </div>
    <Footer/>

    </>
  )
}

export default PetsPage