import React from 'react'
import "./Cart.css"
import CurrencyFormat from "react-currency-format";
import { getCart } from "../../store/store"
import { getCartInfo } from '../../store/store';
import { CheckoutProduct } from "./CheckoutProduct"
import { CartTotal } from "../../components/cartTotal/CartTotal"
import { resetCart } from "../../store/features/userSlice"
import { useDispatch } from 'react-redux';
export const Cart = () => {
  const cart = getCart()
  const dispatch = useDispatch()
  const cartInfo = getCartInfo()
  const removeAllFromBasket = () => {
    dispatch(resetCart())
  }
  return <>
    <div className="checkout">
      <div className="checkout__left">
        {/*<img className="checkout__add" src="https://th.bing.com/th/id/R.80ae5f35f1c44b0f930163d23226366c?rik=%2bJmqA3%2bhXOe%2byw&riu=http%3a%2f%2fwww.newburyportef.org%2fwp-content%2fuploads%2f2016%2f11%2famazon_smile_newbanner.png&ehk=QYz%2b3M45putNX9M8TW4b9l%2fDWCIrYVY34oQs0qJZQCA%3d&risl=&pid=ImgRaw&r=0" alt="Checkout Add" />*/}
        <div>
          <h3 className="checkout__title">Shopping Cart</h3>
          {cart.length > 0 && <h6 className="checkout_subtitle" onClick={removeAllFromBasket}>Deselect all items</h6>}
          {cart.map((item, index) => (
            <CheckoutProduct
              id={item.id}
              price={item.price}
              rating={item.rating}
              title={item.title}
              image={item.image}
              reviews={item.reviews}
              key={item.id}
            />
          ))}

        </div>
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p className="subtotal__calculate">
                Subtotal ({cartInfo?.items} items) : <strong className="subtotal__digits">{value}</strong>
              </p>
            </>
          )}
          decimalScale={2}
          value={cartInfo.total}
          displayType={"text"}
          thousandSeprator={true}
          prefix={"₹ "}
        />
      </div>

      <div className="checkout__right">
        <CartTotal />
      </div>
    </div></>
}
