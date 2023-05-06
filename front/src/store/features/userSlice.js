import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    user: null,
    cart: [],
    cartInfo: {
        total: 0,
        items: 0
    }
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
            state.cartInfo.total += action.payload.price
            state.cartInfo.items += action.payload.quantity
            state.cart.map((product) => {
                if (product.title === action.payload.title) {
                    product.quantity += action.payload.quantity
                    push = false
                }
            })
            if (push) state.cart.push(action.payload)

        },
        resetUser: (state) => {
            return {
                user: null,
                cart: [],
                cartInfo: {
                    total: 0,
                    items: 0
                }
            }

        },
        resetCart: (state) => {
            return {
                ...state,
                cart: [],
                cartInfo: {
                    total: 0,
                    items: 0
                }
            }
        },
        removeItem: (state, action) => {
            let location = -1
            state.cart.map((res, index) => {
                if (res.title === action.payload) {
                    state.cartInfo.total -= res.quantity * res.price
                    state.cartInfo.items -= res.quantity
                    location = index
                }
            })
            if (location === -1) return 
            state.cart.splice(location, 1)
           
        }
    }
})
export const { addUser, addToBasket, resetUser, resetCart, removeItem } = userSlice.actions
export default userSlice.reducer