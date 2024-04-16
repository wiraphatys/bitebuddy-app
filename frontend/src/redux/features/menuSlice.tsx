import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MenuItem, MenuJson } from "../../../interface"
import getMenu from "@/libs/getMenus";

type MenuState = {
    menuItems: MenuItem[];
}

const initialState: MenuState = { menuItems: []};


    
export const menuSlice = createSlice ({
    name: "cart",
    initialState,
    reducers: { 
        setInitialMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
            state.menuItems = action.payload;
        },
        addMenu: (state, action: PayloadAction<MenuItem>) => {
            state.menuItems.push(action.payload);
        },
        removeMenu: (state, action: PayloadAction<String>) => {
            state.menuItems = state.menuItems.filter(obj => obj._id !== action.payload);
        }
    }
})

export const { addMenu, removeMenu, setInitialMenuItems } = menuSlice.actions
export default menuSlice.reducer