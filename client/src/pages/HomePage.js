import { useEffect, useState } from "react";
import SearchComponent from "../components/SearchBar";

import "./HomePage.css";

export default function HomePage() {
  const [animationDuration, setAnimationDuration] = useState(30);

  const slides = [
    {
      src: "https://image.tmdb.org/t/p/w1280/9DUAR7p4SGqt2ISH2lmSzNx3uni.jpg",
      year: 2006,
    },
    {
      src: "https://image.tmdb.org/t/p/w1280/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg",
      year: 2016,
    },
    {
      src: "https://image.tmdb.org/t/p/w1280/fydUcbkqLyESCFa9U5XKqi8dIVj.jpg",
      year: 2013,
    },
    {
      src: "https://image.tmdb.org/t/p/w1280/fxYazFVeOCHpHwuqGuiqcCTw162.jpg",
      year: 1988,
    },
    {
      src: "https://image.tmdb.org/t/p/w1280/yDaMQbBfyGzGWKxUsPMxzWVuJlY.jpg",
      year: 1994,
    },
  ];

  useEffect(() => {
    if (slides.length === 0) return;
    const animationDurationInSecond = 8 * slides.length + 2;
    setAnimationDuration(animationDurationInSecond);
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
        transform: scale(1.24);
      }
    }

    @keyframes yearskeyframe {
      0%, 100% {
        opacity: 0;
      }
      ${100 / animationDuration}% {
        opacity: 0;
      }
      ${300 / animationDuration}% {
        opacity: 0.6;
      }
      ${800 / animationDuration}% {
        opacity: 0.6;
      }
      ${900 / animationDuration}% {
        opacity: 0;
      }
      ${100 - 200 / animationDuration}% {
        opacity: 0;
      }
    }
  `;

  return (
    <div className="homepage">
      <style>{keyframes}</style>

      <p className="unleash-text">UNLEASH YOUR</p>
      <p className="imagination-text">IMAGINATION</p>
      <p className="welcome-text">Welcome to the world of animation.</p>
      <p className="welcome-text">
        <SearchComponent />
      </p>

      {/* background slideshow */}
      <div className="slideshow">
        <div className="slideshow-cover"></div>

        {slides.map((slide, index) => (
          <div key={index}>
            <p
              className={"year-text"}
              style={{
                animation: `yearskeyframe ${animationDuration}s linear ${
                  8 * index
                }s infinite`,
                zIndex: 4,
              }}
            >
              {slides[index].year}
            </p>

            <div
              className="slideshow-image"
              style={{
                backgroundImage: `url('${slide.src}')`,
                animation: `slideskeyframe ${animationDuration}s linear ${
                  8 * index
                }s infinite`,
                zIndex: -index,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
