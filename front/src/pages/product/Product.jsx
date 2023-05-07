import React, { useEffect, useState } from 'react'
import "./Product.css"
import { getProducts } from "../../store/store"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { addToBasket } from "../../store/features/userSlice"
export const Product = () => {
  const [asset, setAsset] = useState(null)
  const { productId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const product = getProducts()
  useEffect(() => {
    let rout = true
    product.map((res) => {
      if (res.id === productId) {
        rout = false
        setAsset(res)
      }
    })
    if (rout) return navigate("/")
  }, [])

  const handelCart = () => {
    dispatch(addToBasket({
      quantity: 1,
      ...asset
    }))
    return navigate("/cart")
  }
  return <>
    <div className="product-details">
      <div className="product-image">
        <img src={`${asset?.image}`} alt="Product Name" />
        <div className="product-action">
          <div className="product-action-item">

            <h1>
              {asset?.price}
            </h1>
            <img src="https://cdn.glitch.global/2d31ebdf-f41b-4ffe-b675-314b920c8cfe/e3e54ac7-92c7-4be4-a08b-920c37091fde.image.png?v=1683351862391" />
            <p>
              Free Deleivery <b>On Monday 26,2023</b>
            </p>
            <a href="#" style={{ marginLeft: "30px", color: "blue" }}>
              🏠Deliver to Ram Doiwala-248140
            </a>
            <p style={{
              color: "green",
              fontSize: "22px"
            }}>
              In Stock
            </p>
            <p>
              Sold by <a href="#" style={{ color: "blue" }}>Cocoblu Retail</a> and <a href="#" style={{ color: "blue" }}>Fulfilled by Amazon</a>.
            </p>
            <center>
              <button className="card-button" onClick={handelCart}>
                Add to card
              </button>
            </center>
            <br />
            <a href="#" style={{ color: "blue" }}> 🔒Secure transaction</a>
          </div>
        </div>

      </div>
      <div className="product-info-container">
        <div className="product-info">
          <h1 className="product-name">{asset?.title}</h1>
          <hr />

          <div className="product-price">{asset?.price}</div>
          <p>
            Summer Sale Deal
          </p>
          <img src="https://cdn.glitch.global/2d31ebdf-f41b-4ffe-b675-314b920c8cfe/e3e54ac7-92c7-4be4-a08b-920c37091fde.image.png?v=1683351862391" />
          <br /> <b>
            Inclusive all taxes
          </b>
          <div className="product-description">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel ultrices dolor, vel finibus justo. Integer ac semper velit, et tincidunt risus. Suspendisse ut ante auctor, euismod enim eu, euismod arcu.</p>
            <p>Donec eget lectus dapibus, sodales enim eget, hendrerit lorem. Aliquam vel sapien eu nibh lacinia maximus vitae a justo. Fusce at rutrum arcu.</p>
          </div>
          {/* here */}

          <div className="product-service">
            <div className="product-service-item">
              <img src="https://cdn.glitch.global/2d31ebdf-f41b-4ffe-b675-314b920c8cfe/69b1c192-3214-4763-a8f9-f0f1871ebbe2.image.png?v=1683352800221" />
              <small>Free Delivery</small>
            </div>

            <div className="product-service-item">

              <img src="https://cdn.glitch.global/2d31ebdf-f41b-4ffe-b675-314b920c8cfe/4f133a94-302c-4eed-8067-28bc81934750.image.png?v=1683352818350" />
              <br />
              <small>Pay on Delivery</small>
            </div>

            <div className="product-service-item">
              <img src="https://cdn.glitch.global/2d31ebdf-f41b-4ffe-b675-314b920c8cfe/75dd6c93-e36a-4d31-a9ae-aea49d498d10.image.png?v=1683352834837" />
              <br /> <small>7 Days Relacement & return</small>
            </div>

            <div className="product-service-item">
              <img src="https://cdn.glitch.global/2d31ebdf-f41b-4ffe-b675-314b920c8cfe/0b7697d0-809f-4448-b9b3-1499d909bc81.image.png?v=1683352850499" />
              <br /><small>90 Days Warrenty</small>
            </div>


          </div>

          <div className="terms-container">
            <img src="https://cdn.glitch.global/2d31ebdf-f41b-4ffe-b675-314b920c8cfe/01bf3fcb-e954-489f-8388-2f498395fdff.image.png?v=1683352875070" />
            <p>
              <b>Note: This product is limited to 3 units per customer.The order quantity is limited to 3 units per customer.</b>
              Please note that orders which exceed the quantity limit will be auto-canceled. This is applicable across sellers.
            </p>
          </div>
        </div>
      </div>


    </div>
  </>
}
