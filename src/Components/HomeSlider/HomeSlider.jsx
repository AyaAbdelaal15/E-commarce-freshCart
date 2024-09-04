import React from "react";
import Slider from "react-slick";
import slider1 from './../../assets/slider-image-1.jpeg'
import slider2 from './../../assets/slider-image-2.jpeg'
import slider3 from './../../assets/slider-image-3.jpeg'
import img1 from './../../assets/blog-img-1.jpeg'
import img2 from './../../assets/blog-img-2.jpeg'
export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className="pb-5">
        <div className="flex flex-wrap justify-center items-center">
            <div className="md:w-2/3 w-full">
                <Slider {...settings}>
                    <div>
                        <img src={slider1} className="w-full h-[400px]" alt="slider" />
                    </div>
                    <div>
                        <img src={slider2} className="w-full h-[400px]" alt="slider" />
                    </div>
                    <div>
                        <img src={slider3} className="w-full h-[400px]" alt="slider" />
                    </div>
                </Slider>
            </div>
            <div className="md:w-1/3 h-[400px] mt-7 md:mt-0 mb-1 w-full">
            <div>
                <img src={img1} alt="img"  className="w-full h-[200px]"/>
            </div>
            <div>
                <img src={img2} alt="img"  className="w-full h-[200px]"/>
            </div>
            </div>
        </div>
    </section>
  );
}
