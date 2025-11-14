import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar'
import Select from '../../Components/ui/Select'
import Card from '../../Components/Card'
import Footer from '../../Components/Footer'
import { useSearchParams } from 'react-router-dom'

const PetsPage = () => {
    const [params,setParams] = useSearchParams();

    const [query,setQuery] = useState({
        gender:'all',
        category:'all'
    })

    useEffect(()=>{
        setParams(query)
    },[query])

  return (
    <>
    <NavBar />
    <div id="container">
        <div id="filter-holder">
            <button onClick={()=>{
                setQuery({gender:"male",category:"cat"})
            }}>change</button>
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