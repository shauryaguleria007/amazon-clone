import { configureStore } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

import userReducer from "./features/userSlice"


export const store = configureStore({
    reducer: {
        userSlice: userReducer
    }
})



export const getUser = () => {
    return useSelector((state) => state.userSlice.user)
}