import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useNavigate } from 'react-router-dom';

const Corousal = ({ categories = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!emblaApi) return;
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [emblaApi]);

  return (
    <div style={{ overflow: 'hidden', padding: 'var(--space-md) 0' }} ref={emblaRef}>
      <div style={{ display: 'flex', touchAction: 'pan-y' }}>
        {categories.map((cat) => (
          <div
            style={{ flex: '0 0 auto', minWidth: '0', paddingLeft: 'var(--space-md)', width: '280px', cursor: 'pointer' }}
            key={cat._id}
            onClick={() => navigate(`/pets?category=${cat._id}`)}
          >
            <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ flex: 1, width: '100%', overflow: 'hidden' }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: 'var(--space-md)', background: 'var(--bg-card)', textAlign: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)' }}>{cat.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Corousal;