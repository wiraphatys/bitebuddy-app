import { combineReducers, configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "./features/restaurantSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "rootPersist",
    storage
}

const rootReducer = combineReducers({restaurantSlice})
const reduxPersistReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore(
    {
        reducer: reduxPersistReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
