'use client'
import React from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RestaurantItem, RestaurantJson } from "../../interface";
import RestaurantCard from "./RestaurantCard";
import styles from './restaurantcard.module.css'
import { dot } from "node:test/reporters";

export default function RestaurantSlider({restaurantsJson}: {restaurantsJson: RestaurantJson}) {
  const restaurants = restaurantsJson
  console.log(restaurantsJson)
  let show = 3;
  if(restaurants.count < 3){
    show = restaurants.count
  }
  const settings = {
    dot: false,
    infinite: restaurants.count > 4,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className={styles.slider}>
      <Slider {...settings}>
      {
        restaurants.data.map((restaurantItem: RestaurantItem) => (
          <div key={restaurantItem._id}>
            <RestaurantCard name={restaurantItem.name} img={restaurantItem.img} open={restaurantItem.open} close={restaurantItem.close} avgRating={restaurants.averageRating} id={restaurantItem._id}/>
          </div>
        ))
      }
      </Slider>
    </div>
  );
}