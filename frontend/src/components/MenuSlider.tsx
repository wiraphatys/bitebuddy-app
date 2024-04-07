'use client'
import React from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MenuItem, MenuJson } from "../../interface";
import MenuCard from "./MenuCard";
import styles from './menucard.module.css'

export default function MenuSlider({menusJson}: {menusJson: MenuJson}) {
  const menus = menusJson
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className={styles.slider}>
      <Slider {...settings}>
      {
        menus.data.map((menuItem: MenuItem) => (
          <div key={menuItem._id}>
            <MenuCard name={menuItem.name} img={menuItem.img} description={menuItem.description}/>
          </div>
        ))
      }
      </Slider>
    </div>
  );
}