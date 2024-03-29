import { useEffect, useState } from 'react';

import './HomePage.css';

export default function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideDuration, setSlideDuration] = useState(10);
  const [animationDuration, setAnimationDuration] = useState(30);

  const slides = [
    { src: "https://image.tmdb.org/t/p/w1280/9DUAR7p4SGqt2ISH2lmSzNx3uni.jpg", year: 2016 },
    { src: "https://image.tmdb.org/t/p/w1280/yDaMQbBfyGzGWKxUsPMxzWVuJlY.jpg", year: 2013 },
    { src: "https://image.tmdb.org/t/p/w1280/fydUcbkqLyESCFa9U5XKqi8dIVj.jpg", year: 1994 },
    { src: "https://image.tmdb.org/t/p/w1280/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg", year: 2006 }    
  ]

  // Set timer for the animation
  useEffect(() => {
    if (slides.length === 0) return;
    const animationDurationInSecond = 8 * slides.length + 2;
    const slideDurationInSecond = animationDurationInSecond / slides.length;
    setSlideDuration(slideDurationInSecond);
    setAnimationDuration(animationDurationInSecond);
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, slideDurationInSecond * 1000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const keyframes = `
    @keyframes slideskeyframe {
      0%, 100% {
        opacity: 1;
        transform: scale(1.2);
      }
      ${800 / animationDuration}% {
        opacity: 1;
      }
      ${1000 / animationDuration}% {
        opacity: 0;
        transform: scale(1);
      }
      ${100 - 200 / animationDuration}% {
        opacity: 0;
        transform: scale(1.3);
      }
    }

    .year-text { 
      margin: 0;
      padding: 0;
      animation: fadeInFadeOut ${slideDuration}s ease-in-out infinite;
    }
  `

  return (
    <div className='homepage'>
      <style>{keyframes}</style>
      <div className="year">
        {slides.map((slide, index) => (
          <p key={index} className={slideIndex === index ? 'year-text' : 'year-text-hide'}>{slide.year}</p>
        ))}
      </div>

      <p className="unleash-text">
        UNLEASH YOUR
      </p>
      <p className="imagination-text">
        IMAGINATION
      </p>
      <p className="welcome-text">
        Welcome to the world of animation.
      </p>

      {/* background slideshow */}
      <div className="slideshow">
        <div className="slideshow-cover"></div>

        {slides.map((slide, index) => (
          <div className="slideshow-image" key={index} style={{
            backgroundImage: `url('${slide.src}')`,
            animation: `slideskeyframe ${animationDuration}s linear ${8 * index}s infinite`,
            zIndex: -index
          }}>
          </div>
        ))}
      </div>
    </div>
  );
};