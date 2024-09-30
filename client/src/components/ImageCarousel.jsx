import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../App.css";

//import images
import img1 from "../assets/landing_images/hike_date.jpg";
import img2 from "../assets/landing_images/dinner_date.jpg";
import img3 from "../assets/landing_images/coffee_date.jpg";
import img4 from "../assets/landing_images/park_date.jpg";

const responsive = {
    fullScreen: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    halfScreen: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    smallScreen: {
        breakpoint: { max: 464, min: 0},
        items: 1,
    }
};

const LandingImages = [img1, img2, img3, img4];
// const LandingImages = [img2];

const ImageCarousel = () => {
    return (
        <div className="landingBackground">

        <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            transitionDuration={3000}
            customTransition="all 3s ease-in-out"
            arrows={false}
            showDots={false}
            >

            {LandingImages.map((LandingImages, index) => (
                <div key={index} style={{ width: '100%', height: '100' }} >
                    <img src={LandingImages} alt={`Carousel ${index}`} style={{ width: '100%', height: 'auto'}} />
                </div>
            ))}
        </Carousel>

        </div>
    )
};

export default ImageCarousel;