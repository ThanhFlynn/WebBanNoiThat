import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default class TopCategories extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                infinite: true,
                autoplay: true,
                // centerMode: true,
                // centerPadding: '40px',
                slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                infinite: true,
                autoplay: true,
                // centerMode: true,
                // centerPadding: '40px',
                slidesToShow: 2
            }
        } 
    ]
    };
    return (
      <div className="container topCategories">
        <h2>Danh mục hàng đầu</h2>
        <Slider ref={c => (this.slider = c)} {...settings} className="mt-4 text-center">
          <div key={1}>
            <h3>1</h3>
          </div>
          <div key={2}>
            <h3>2</h3>
          </div>
          <div key={3}>
            <h3>3</h3>
          </div>
          <div key={4}>
            <h3>4</h3>
          </div>
          <div key={5}>
            <h3>5</h3>
          </div>
          <div key={6}>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}