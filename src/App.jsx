import { useState, useEffect, useRef } from "react";
import { images } from "./images";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function App() {
  const [counter, setCounter] = useState(0);

  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const sliderContainerRef = useRef(null);

  const prev = () => {
    setCounter((counter) => {
      return (counter -= 1);
    });
  };

  const next = () => {
    setCounter((counter) => {
      return (counter += 1);
    });
  };

  const slide = (counter) => {
    const slides = sliderContainerRef.current.querySelectorAll(".slide");

    console.log(counter);
    counter === slides.length - 1
      ? (nextBtnRef.current.style.display = "none")
      : (nextBtnRef.current.style.display = "inline");

    counter > 0
      ? (prevBtnRef.current.style.display = "inline")
      : (prevBtnRef.current.style.display = "none");

    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${counter * 100}%)`;
    });
  };

  useEffect(() => {
    const slides = sliderContainerRef.current.querySelectorAll(".slide");

    slides.forEach((slide, index) => {
      slide.style.left = `${100 * index}%`;
    });

    counter === slides.length - 1
      ? (nextBtnRef.current.style.display = "none")
      : (nextBtnRef.current.style.display = "inline");

    counter > 0
      ? (prevBtnRef.current.style.display = "inline")
      : (prevBtnRef.current.style.display = "none");

    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${counter * 100}%)`;
    });
  }, [counter]);

  return (
    <main>
      <h1 onClick={slide}>Carousel</h1>
      <div className="slider-container" ref={sliderContainerRef}>
        {images.map((img, index) => (
          <article key={index} className="slide">
            <img src={img} alt="" />
          </article>
        ))}
      </div>
      <div className="btns-container">
        <button
          aria-label="prev"
          onClick={prev}
          ref={prevBtnRef}
          className="btn prev-btn"
        >
          <FaAngleLeft />
        </button>
        <button
          aria-label="next"
          onClick={next}
          ref={nextBtnRef}
          className="btn next-btn"
        >
          <FaAngleRight />
        </button>
      </div>
    </main>
  );
}

export default App;
