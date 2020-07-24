import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

export class Showcase extends Component {
  render() {
    const settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
    };
    return (
      <div className="showcase">
        <div className="showcase__slider">
          <Slider {...settings}>
            <div className="showcase__slider-image showcase__slider-image--1"></div>
            <div className="showcase__slider-image showcase__slider-image--2"></div>
            <div className="showcase__slider-image showcase__slider-image--3"></div>
            <div className="showcase__slider-image showcase__slider-image--4"></div>
            <div className="showcase__slider-image showcase__slider-image--5"></div>
            {/* <div className="showcase__slider-image showcase__slider-image--6"></div> */}
            <div className="showcase__slider-image showcase__slider-image--7"></div>
          </Slider>
        </div>
        <Fade top>
          <div className="showcase__cta">
            <div className="showcase__cta-text">
              <h1>
                Shop Exclusive <br /> KIT Merch
              </h1>
              <h3>join the royal army</h3>
            </div>
            <Link to="/shop" className="btn">
              Shop Now
            </Link>
          </div>
        </Fade>
      </div>
    );
  }
}

export default Showcase;
