import React from 'react';
import './Carousel.scss';
import { useNavigate } from 'react-router-dom';
import img from '../../../public/images/carousel.jpg';

const Carousel = ({ departureLocation, arrivalLocation, message }) => {
  const navigate = useNavigate();

  return (
    <div className='carousel'>
      <img
        src={img}
        alt='Carousel Background'
        className='carousel-background'
      />
      <div className='carousel-overlay'>
        <div className='selection-prompt'>
          <h2>{message}</h2>
          <p>
            {departureLocation} đến {arrivalLocation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
