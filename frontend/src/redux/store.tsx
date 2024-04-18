import { combineReducers, configureStore } from "@reduxjs/toolkit";
import menuSlice from "./features/menuSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "rootPersist",
    storage
}

const rootReducer = combineReducers({menuSlice})
const reduxPersistReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore(
    {
        reducer: reduxPersistReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        }) 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
