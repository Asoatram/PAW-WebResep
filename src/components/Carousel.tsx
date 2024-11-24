import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import './Carousel.module.css'

const Carousel = () => {
    const images = [
        {
            src: 'https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=',
            alt: 'Delicious Salad',
            caption: 'Find the right pick',
        },
        {
            src: 'https://res.cloudinary.com/hz3gmuqw6/image/upload/c_fill,q_auto,w_750/f_auto/cincinnati-food-phpfuVz4t',
            alt: 'Grilled Chicken',
            caption: 'Healthy and Tasty',
        },
        {
            src: 'https://www.foodiesfeed.com/wp-content/uploads/2023/05/juicy-cheeseburger.jpg',
            alt: 'Fresh Ingredients',
            caption: 'Fresh and Organic',
        },
    ];

    return (
        <div className="carousel-container">
            <Swiper
                spaceBetween={30}
                pagination={{ clickable: true }}
                navigation
                loop={true}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="carousel-slide">
                            <img src={image.src} alt={image.alt} className="carousel-image" />
                            <div className="carousel-caption">{image.caption}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel;