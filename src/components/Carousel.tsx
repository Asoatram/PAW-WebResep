import React, { useState } from "react";

const Carousel = () => {
    const slides = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvC1pGhW7_BRwnGuBguLE99tfA0faYflekCA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-NJfsqAVcMSYy9O8d-7f9dQ92Z3A0YNYZwQ&s",
        "https://images.yourstory.com/cs/7/1da9ec3014cc11e9a1b2b928167b6c62/bowlfoodinside3-1579518185672.png?fm=png&auto=format&blur=500",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto pb-6">
            {/* Carousel Container */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <img
                            key={index}
                            src={slide}
                            alt={`Slide ${index + 1}`}
                            className="w-full flex-shrink-0"
                        />
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                onClick={handlePrev}
            >
                ❮
            </button>
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                onClick={handleNext}
            >
                ❯
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? "bg-gray-800" : "bg-gray-400"
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
