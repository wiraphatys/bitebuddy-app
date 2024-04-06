import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interface"
import getRestaurants from "@/libs/getRestaurants";

type RestaurantState = {
    restaurantItems: RestaurantItem[];
}

const initialState: RestaurantState = { restaurantItems: getRestaurants()};

export const reservationSlice = createSlice ({
    name: "cart",
    initialState,
    reducers: {
        addReservation: (state, action:PayloadAction<ReservationItem>) => {
            const remainItems = state.restaurantItems.findIndex(obj => obj.user === action.payload.user);
            
            if (remainItems !== -1) {
                state.restaurantItems[remainItems] = action.payload;
            } else {
                state.restaurantItems.push(action.payload);
            }
        },
        removeReservation: (state, action: PayloadAction<string>) => {
            state.restaurantItems = state.restaurantItems.filter(obj => obj.user !== action.payload);
        }   
    }
})

export const { addReservation, removeReservation } = reservationSlice.actions
export default reservationSlice.reducer