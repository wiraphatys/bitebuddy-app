'use client'
import RestaurantSlider from "@/components/RestaurantSlider";
import getRestaurants from "@/libs/getRestaurants";
import styles from './page.module.css'
import { useEffect, useState } from "react";
import { RestaurantJson } from "../../../interface";

export default function RestaurantsPage () {
    const [restaurants, setRestaurants] = useState<RestaurantJson>({success: false,
        count: 0,
        data: [],
        averageRating: 0});
    useEffect( () => {
        fetchData()        
    },[])

    const fetchData = async () => {
        setRestaurants(await getRestaurants())
    }

    console.log(restaurants);
    return (
        <div className={styles.page}>
            <h1>Restaurant</h1>
            <RestaurantSlider restaurantsJson={restaurants}/>
        </div>
    );
}