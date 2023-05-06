import React, { useState, useEffect } from 'react'
import "./Payment.css"
import { Link } from "react-router-dom"
import axios from "../../axios.js"
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import { useDispatch } from 'react-redux';
import { getCartInfo, getUser, getCart } from "../../store/store"
import { CheckoutProduct } from "../Cart/CheckoutProduct"
import { resetCart } from "../../store/features/userSlice"
export const Payment = () => {
    const cartInfo = getCartInfo()
    const user = getUser()
    const cart = getCart()
    const dispatch = useDispatch()
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState(true);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${cartInfo.items * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [cartInfo])



    const handleChange = event => {

        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");


    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ response }) => {

            // payment confirmation


            setSucceeded(true);
            setError(null);
            setProcessing(false);
            navigate('./orders', { replace: true });

        })


    }
    return (
        <div className="payment">
            <div className="payment__container">

                <h1 className="head"> Checkout(<Link to="/checkout"> {cartInfo.items} Items</Link>)
                </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address </h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p className="payment_address">Flat No. 409 Tower-A3</p>
                    </div>


                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>

                    </div>
                    <div className="payment_items">
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


                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="paymenyt_details">
                        {/* stripe magic */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment_pricecontainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>

                                    )}

                                    decimalScale={2}
                                    value={cartInfo.total}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"Rs"}
                                />

                                <Link to="/thanku" replace onClick={() => dispatch(resetCart())}>
                                    <button className="buy_button" disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing...</p> :
                                            "Buy Now"}</span>
                                    </button>
                                </Link>




                            </div>
                            {error && <div>{error}</div>}
                        </form>

                    </div>

                </div>
            </div>


        </div>
    )
}

