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
            let push = true
            state.products.map((res) => {
                if (res.title === action.payload.title) push = false
            })
            if (push) state.products.push(action.payload)
            else return state
        },
        resetProducts: (state) => {
            return {
                products: [],
                categories: []
            }

        }
    }
})
export const { addCategorie, addProduct, resetProducts } = productSlice.actions
export default productSlice.reducer