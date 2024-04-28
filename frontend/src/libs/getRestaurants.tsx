'use client'
import config from "@/utils/config";
import { RestaurantJson } from "../../interface";

export default async function getRestaurants() {
    
    await new Promise((resolve)=>setTimeout(resolve,1000))
    const response = await fetch(`${config.api}/restaurants`, config.headers());

    if (!response.ok) {
        throw new Error('Failed to fetch restaurants: ' + response.statusText);
    }

    return await response.json();
}