import React, { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useNavigate } from 'react-router-dom'

const Corousal = ({ categories = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  })
  const navigate = useNavigate();

  // Manual Autoplay Implementation
  useEffect(() => {
    if (!emblaApi) return;
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [emblaApi]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {categories.map((cat) => (
          <div
            className="embla__slide"
            key={cat._id}
            onClick={() => navigate(`/pets?category=${cat._id}`)}
          >
            <div className="category-slide-card">
              <img src={cat.image} alt={cat.name} />
              <div className="category-overlay">
                <span>{cat.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Corousal