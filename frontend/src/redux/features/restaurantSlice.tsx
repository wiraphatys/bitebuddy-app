import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RestaurantItem, RestaurantJson } from "../../../interface"
import getRestaurants from "@/libs/getRestaurants";

type RestaurantState = {
    restaurantItems: RestaurantItem[];
}

const initialState: RestaurantState = { 
    restaurantItems: []};

export const restaurantSlice = createSlice ({
    name: "cart",
    initialState,
    reducers: {
        addRestaurant: (state, action: PayloadAction<RestaurantItem>) => {

        },
        removeRestaurant: (state, action: PayloadAction<RestaurantItem>) => {
            
        }
    }
})

export const { addRestaurant, removeRestaurant } = restaurantSlice.actions
export default restaurantSlice.reducer