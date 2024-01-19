import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Header.css'; 

const Header = () => {
    const imagePaths = [
        '/univers1.png',
        '/Planaetpic.png',
        '/universe2.png',
    ];

    const messages = [
        {
            title: 'Unleashing the Power of Space Travel',
            text: 'Experience the thrill of space travel with SpaceX as we unleash the power of cutting-edge technology to reach new heights and beyond.',
        },
        {
            title: 'Innovation in Rocketry',
            text: 'At SpaceX, we push the boundaries of innovation in rocketry, designing and launching advanced rockets to propel us towards new frontiers.',
        },
        {
            title: 'Exploring the Cosmos',
            text: 'Embark on a journey through the vast cosmos as we explore the mysteries of space and unlock the secrets of our universe.',
        },
    ];

    return (
        <div className="rocket-container"> 
            <Carousel interval={1000}>
                {imagePaths.map((imagePath, index) => (
                    <Carousel.Item key={index} className="rocket-image-Header-slider">
                        <img src={imagePath} alt={`Slide ${index + 1}`} className="rocket-image-Header-slider" />
                        <Carousel.Caption className="slider-caption">
                            <h1 className="Carousel-title">{messages[index].title}</h1>
                            <p className="Carousel-message">{messages[index].text}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default Header;

