import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    products: [],
    categories: []
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addCategorie: (state, action) => {
            state.categories = [...action.payload]
        },
        addProduct: (state, action) => {
            state.products.push(action.payload)
        }
    }
})
export const { addCategorie, addProduct } = productSlice.actions
export default productSlice.reducer