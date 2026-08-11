import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

// Carousel component for displaying a slideshow of slides with navigation controls
const Carousel = ({ slides, interval = 5000, className = "" }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused || slides.length <= 1) return undefined;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [paused, slides.length, interval]);

  if (!slides.length) return null;

  const goTo = (index) => setActive((index + slides.length) % slides.length);

  return (
    // Carousel container with navigation buttons and slide indicators
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Highlights"
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full shrink-0" aria-hidden={active !== index}>
            {slide}
          </div>
        ))}
      </div>
      {/* Navigation buttons and slide indicators */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(active - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-primary-700 shadow-md transition hover:bg-white"
          >
            <HiChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(active + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-primary-700 shadow-md transition hover:bg-white"
          >
            <HiChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all ${
                  active === index ? "w-6 bg-white" : "w-2 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
