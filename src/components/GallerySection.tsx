import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const GallerySection = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/path/to/photo1.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First Slide</h3>
                    <p>Description for the first slide.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/path/to/photo2.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Second Slide</h3>
                    <p>Description for the second slide.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/path/to/photo3.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Third Slide</h3>
                    <p>Description for the third slide.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default GallerySection;