import React from 'react'
import "./CartTotal.css"
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom"
import { getCartInfo } from '../../store/store';
export const CartTotal = () => {
    const navigate = useNavigate()
    const cartInfo = getCartInfo()
    return (
        <div className="subtotal">
            <div className='subtotal_gift_text_container'>
                <span className='tick__icon'>
                    {/* <TickSvg /> */}
                </span>
                <p className='subtotal_gift_text'><span className='subtotal_gift_text_green'>Part of your order qualifies for FREE Delivery.
                </span> Select this option at checkout Details</p>
            </div>
            {/*For rendering the money*/}
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p className='subtotal__text'>
                            Subtotal({cartInfo?.items} items) : <strong className="subtotal__digits">{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" />This order contains a gift</small>
                    </>
                )}
                decimalScale={2}
                value={cartInfo.total}
                displayType={"text"}
                thousandSeprator={true}
                prefix={"₹ "}
            />
            <button onClick={e => navigate("/payment")} className="proceed__button">Proceed to Buy</button>
        </div>
    );
}
