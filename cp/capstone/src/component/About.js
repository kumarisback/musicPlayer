import React from "react";
import { Carousel } from "react-bootstrap";

const About = () => {
  return (
    <Carousel className="aboutPage">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQwlNP4KJcgSK97C5L8FnxWLqbvA5iDmPI-w&usqp=CAU"
          alt="First slide"
        />
        <Carousel.Caption className="carousel-caption">
          <h3>WELCOME TO CAPSTONE MUSIC PLAYER</h3>
          <p>Stay connected, stay updated about artists you adore</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQwlNP4KJcgSK97C5L8FnxWLqbvA5iDmPI-w&usqp=CAU"
          alt="First slide"
        />
        <Carousel.Caption className="carousel-caption">
          <h3>Share Playlists</h3>
          <p>Create and share your playlists with your friends.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default About;
