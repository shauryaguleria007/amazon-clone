import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    user: null,
    cart: []
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        addToBasket: (state, action) => {
            let push = true
            state.cart.map((product) => {
                if (product.id === action.payload.id) {
                    product.quantity+=action.payload.quantity
                    push = false
                }
            })
            if (push) state.cart.push(action.payload)
            
        }
    }
})
export const { addUser, addToBasket } = userSlice.actions
export default userSlice.reducer