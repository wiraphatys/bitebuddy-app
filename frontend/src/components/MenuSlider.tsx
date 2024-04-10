'use client'
import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MenuItem, MenuJson } from "../../interface";
import MenuCard from "./MenuCard";
import styles from './menucard.module.css'
import getMenu from "@/libs/getMenus";

export default function MenuSlider({rid}: {rid: string}) {
    const [menus, setMenus] = useState<MenuItem[]>();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const menuData = await getMenu(rid);
                console.log(menuData);
                setMenus(menuData.data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchMenu();
    }, [rid]);
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };
  return (
    <div>
    {
        (menus && menus?.length > 0) ? 
      <Slider {...settings}>
      {
        menus?.map((menuItem: MenuItem) => (
          <div key={menuItem._id}>
            <MenuCard name={menuItem.name} img={menuItem.img} description={menuItem.description}/>
          </div>
        ))
      }
      </Slider> : ''
    }
    </div>
  );
}