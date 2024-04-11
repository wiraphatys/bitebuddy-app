'use client'
import RestaurantSlider from "@/components/RestaurantSlider";
import getRestaurants from "@/libs/getRestaurants";
import styles from './page.module.css'
import { useEffect, useState } from "react";
import { RestaurantJson } from "../../../interface";

export default function RestaurantsPage () {
    const [restaurants, setRestaurants] = useState<RestaurantJson>({success: false,
        count: 0,
        data: []});
    useEffect( () => {
        fetchData()        
    },[])

    const fetchData = async () => {
        setRestaurants(await getRestaurants())
    }

    return (
        <div className={styles.page}>
            <h1>Restaurant</h1>
            <RestaurantSlider restaurantsJson={restaurants}/>
        </div>
    );
}