import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
    async function getAllCategory(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    const {data} = useQuery("category" , getAllCategory);
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
              autoplay: true,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 1,
              autoplay: true,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
            }
          }
        ]
      };
  return (
    <section className="p- mb-10 mt-7">
        <Slider {...settings}>
            {data?.data.data.map( function (item , idx){
                return(
                <div key={idx} className="lg:w-1/6 md:w-1/3">
                    <img src={item.image} alt="slider" className="w-full h-[200px]"/>
                    <h2 className="text-green-600  font-bold"> {item.name} </h2>
                </div>)
            }) }
        </Slider>
    </section>
  );
}