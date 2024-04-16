'use client'
import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MenuItem, MenuJson } from "../../interface";
import MenuCard from "./MenuCard";
import getMenu from "@/libs/getMenus";
import styles from './restaurantowner.module.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setInitialMenuItems } from "@/redux/features/menuSlice"
import Menu from "./Menu";

export default function MenuSlider({rid}: {rid: string}) {
    const [role, setRole] = useState<string|null>();
    const [create, setCreate] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const menuItems = useAppSelector((state) => state.menuSlice.menuItems);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const menuData = await getMenu(rid);
                setRole(localStorage.getItem('role'))
                console.log(menuData);
                dispatch(setInitialMenuItems(menuData.data))
                
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchMenu();
    }, [rid]);

    useEffect(() => {
      console.log('menuItems:', menuItems);
    }, [menuItems]);
    const settings = {
    dots: role !== 'owner',
    infinite: role !== 'owner',
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
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
      {
        role == 'owner' ? <button className={styles.createButton} onClick={() => setCreate(true)}><AddCircleOutlineIcon/> Add Your Menu</button> : null
      }
      {
        create ? <MenuCard rid={rid} setCreate={setCreate}/> : null
      }
    {
        (menuItems && menuItems?.length > 0) ? 
      <Slider {...settings}>
      {
        menuItems?.map((menuItem: MenuItem) => (
          <div key={menuItem._id} className="mt-5">
            <Menu name={menuItem.name} img={menuItem.img} description={menuItem.description} mid={menuItem._id}/>
          </div>
        ))
      }
      </Slider> : ''
    }
    </div>
  );
}