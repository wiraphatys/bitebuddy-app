'use client'
import React from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RestaurantItem, RestaurantJson, RestaurantOwnerJson } from "../../interface";
import RestaurantCard from "./RestaurantCard";
import styles from './restaurantcard.module.css'
import { useRouter } from "next/navigation";

export default function RestaurantSlider({restaurantsJson}: {restaurantsJson: RestaurantJson}) {
  const router = useRouter()
  console.log(localStorage.getItem('role'));
  if(localStorage.getItem('role') == "owner"){
    router.push('/');
  }
  const restaurants = restaurantsJson
  let show = 3;
  if(restaurants.count < 3){
    show = restaurants.count
  }
  const settings = {
    dot: false,
    infinite: false,
    className: "center",
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };
  return (
    <div className='slider-container'>
      <Slider {...settings}>
      {
        restaurants.data.map((restaurantItem: RestaurantItem) => (
          <div key={restaurantItem._id}>
            <RestaurantCard name={restaurantItem.name} img={restaurantItem.img} open={restaurantItem.open} close={restaurantItem.close} avgRating={restaurantItem.averageRating} id={restaurantItem._id}/>
          </div>
        ))
      }
      </Slider>
    </div>
  );
}