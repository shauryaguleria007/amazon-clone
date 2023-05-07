import React, { useState, useEffect } from 'react'
import "./Header.css"

import { Link, useNavigate } from 'react-router-dom'

import Logo from "../../assets/amazon-logo.png"
import { HeaderSearchBar } from "./HeaderSearchBar"
import { useGlobalContext } from "../../context/globalContext"
import { getUser, getCart } from "../../store/store"

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const Header = () => {
    const { inputHandler } = useGlobalContext()
    const user = getUser()
    const cart = getCart()
    const [value, setValue] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    let navigate = useNavigate();

    useEffect(() => {
        if (user) setValue(false)
        else setValue(true)
        let timeout = setTimeout(() => setValue(false), 7000)
        return () => clearTimeout(timeout)
    }, [user])

    const updateWidth = () => {
        let width = window.innerWidth;
        setScreenWidth(width);
    };

    const debounce = (func, time) => {
        let timer;
        return function () {
            let context = this,
                args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(context, args);
            }, time);
        };
    };

    const optimizedWidthSetter = debounce(updateWidth, 100);
    window.addEventListener('resize', optimizedWidthSetter);

    const renderNonMobileElements = () => {
        return (
            <>
                <div className="header__option relative">
                    <span className="header__optionLineOne">Hello, {user ? user?.email.slice(0, 7) : 'user'}</span>
                    {/*this will handle the authentication
        if user is already signed in it will show 
        signout*/}
                    <span className="header__optionLineTwo br-2" onClick={user ? () => navigate("/logout") : () => navigate('/login')}>
                        {user ? 'Sign Out' : 'Sign In'}
                    </span>
                    {(value) ? <>
                        <div className="nav_arrow"></div>
                        <div className="box">
                            <div className="signupbtn" onClick={() => navigate('/login')}>
                                Sign In
                            </div>
                            <div className="text">
                                New customer?<span className="link" onClick={() => navigate('/register')}> Start here.</span>
                            </div>
                        </div>
                    </> : null}
                </div>
                <div className="header__option">
                    <Link to="/">
                        <span className="header__optionLineOne">Returns</span><br />
                        <span className="header__optionLineTwo">& Orders</span>
                    </Link>
                </div>
            </>
        );
    };

    const renderMobileElements = () => {
        return (
            <>
                <div onClick={() => navigate("/login")} className="header__option">
                    userSvg
                    <span>{user ? user?.email.slice(0, 7) : 'Sign In'}</span>
                </div>
            </>
        );
    };
    return (
        <div className="header">
            <Link to="/">
                <img className="header__logo" src={Logo} alt="Amazon logo" />
            </Link>

            {screenWidth > 790 ? (
                <div className="header__locationOption">
                    <span className="header__optionLineOne">Hello</span>
                    <span className="header__locationOptionLineTwo">
                        <PlaceOutlinedIcon fontSize='small' /> Select your location
                    </span>
                </div>
            ) : (
                ''
            )}
            <div className="header__search">
                <HeaderSearchBar onSearch={inputHandler} />
            </div>
            <div className="header__nav">
                {screenWidth >= 650
                    ? renderNonMobileElements()
                    : renderMobileElements()}
                <Link to="/cart" className="header__checkout">
                    <div className="header__optionBasket">
                        <ShoppingCartIcon /> 
                        <div className="header__basketCount">{cart.length}</div>
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
