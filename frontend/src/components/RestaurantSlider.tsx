'use client'
import React, { useEffect } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RestaurantItem, RestaurantJson } from "../../interface";
import RestaurantCard from "./RestaurantCard";
import { useRouter } from "next/navigation";

export default function RestaurantSlider({restaurantsJson}: {restaurantsJson: RestaurantJson}) {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('role') === "owner" || !localStorage.getItem('role')){
        router.push('/');
      }
    }
  }, []);
  const restaurants = restaurantsJson
  const settings = {
    dot: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: true,
    nextArrow: (
      <div>
        <div className="next-slick-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
        </div>
      </div>
    ),

    prevArrow: (
      <div>
        <div className="next-slick-arrow rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
        </div>
      </div>
    ),
  };
  return (
    <div>
      <Slider {...settings}>
      {
        restaurants.data.map((restaurantItem: RestaurantItem) => (
          <RestaurantCard name={restaurantItem.name} img={restaurantItem.img} open={restaurantItem.open} close={restaurantItem.close} avgRating={restaurantItem.averageRating} id={restaurantItem._id}/>
        ))
      }
      </Slider>
    </div>
  );
}