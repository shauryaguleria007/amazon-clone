import React ,{useState}from 'react'
import "./Header.css"

import { Link } from 'react-router-dom'

import Logo from "../../assets/amazon-logo.png"
// import { ReactComponent as CartSvg } from '../../assets/Cart.svg'
import { HeaderSearchBar } from "./HeaderSearchBar"
import { useGlobalContext } from "../../context/globalContext"

export const Header = () => {
    const { inputHandler } = useGlobalContext()
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    return (
        <div className="header">
            <Link to="/">
                <img className="header__logo" src={Logo} alt="Amazon logo" />
            </Link>
            {/* js width */}
            <div className="header__search">
                <HeaderSearchBar onSearch={inputHandler} />
            </div>
            <div className="header__nav">
                <Link to="/checkout" className="header__checkout">
                    <div className="header__optionBasket">
                        {/* <CartSvg /> */}
                        <div className="header__basketCount">{1}</div>
                    </div>
                    {screenWidth > 860 ? (
                        <div className="header__basketText">Cart</div>
                    ) : (
                        ''
                    )}
                </Link>
            </div>
        </div>
    )
}
