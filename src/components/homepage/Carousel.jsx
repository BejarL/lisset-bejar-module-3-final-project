import { useState, useEffect } from "react";
import { useRawgApi } from "../../services/useRawgApi";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, isLoading, isError } = useRawgApi("games");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [data.length]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center text-lg">
        Loading carousel...
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-lg text-red-500">
        Error loading carousel. Please try again later.
      </div>
    );

  const goToPrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex justify-center items-center p-3 relative">
      {data.map((item, index) => (
        <img
          key={item.id}
          src={item.background_image}
          alt={item.name}
          className={`rounded-lg m-1 transition-opacity duration-300 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          } w-auto h-[500px] max-w-[50%]`}
          loading="lazy"
          style={{ display: index === activeIndex ? "block" : "none" }}
        />
      ))}
      <button
        onClick={goToPrev}
        className="absolute left-5 z-10 p-2 bg-gray-800 bg-opacity-50 rounded-full"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-5 z-10 p-2 bg-gray-800 bg-opacity-50 rounded-full"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
