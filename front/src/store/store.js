import { configureStore } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import authApi from "./services/authService"
import userReducer from "./features/userSlice"
import productReducer from "./features/productSlice"


export const store = configureStore({
    reducer: {
        userSlice: userReducer,
        productSlice: productReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
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