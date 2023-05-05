import { configureStore } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

import userReducer from "./features/userSlice"
import productReducer from "./features/productSlice"


export const store = configureStore({
    reducer: {
        userSlice: userReducer,
        productSlice: productReducer
    }
})



export const getUser = () => {
    return useSelector((state) => state.userSlice.user)
}

export const getCart = () => {
    return useSelector((state) => state.userSlice.cart)
}

export const getProducts = () => {
    return useSelector((state) => state.productSlice.products)
}

export const getCategories = () => {
    return useSelector((state) => state.productSlice.categories)
}