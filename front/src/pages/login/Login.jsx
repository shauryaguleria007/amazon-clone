import React, { useState, useEffect } from 'react'
import "./Login.css"

import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from '../../store/services/authService';


export const Login = () => {
    const [LoginUser, { data, isFetching }] = useLoginUserMutation()
    const anchLink = `https://amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940`;
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        if (email !== "" && password !== "") {
            await LoginUser({ mobile: email, password })
        }
    }

    useEffect(() => {
        if (data) {
            localStorage.setItem('token', `Bearer ${data?.token}`)
            console.log("here");
            return navigate("/")
        }
    }, [data])
    const changePage = e => {
        e.preventDefault();
        document.getElementById("mailText").style.display = "none";
        document.getElementById("mailBox").style.display = "none";
        document.getElementById("Continuebutton").style.display = "none";
        document.getElementById("pswdBox").style.display = "block";
        document.getElementById("pswdText").style.display = "block";
        document.getElementById("signInbutton").style.display = "block";
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__img" src="https://th.bing.com/th/id/OIP.Ku4iy6JfyZOZAKxOkfp0ewHaEK?pid=ImgDet&rs=1" alt="Login" />
            </Link>
            <div className="login__container">
                <h1 className="login__sign">Sign in</h1>
                <form>
                    <h5 className="credential_name" id="mailText">Email</h5>
                    <h5 className="credential_name" id="pswdText" style={{ display: "none" }}>Password</h5>
                    <input type="text" className="input_box" value={email} id="mailBox" onChange={e => setEmail(e.target.value)} style={{ background: "white" }} />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ display: "none" }} id="pswdBox" className="input_box" />
                    <button id="Continuebutton" onClick={changePage} >Continue</button>
                    <button className="loginsign_button" id="signInbutton" type="submit" onClick={login} style={{ display: "none"}} disabled={isFetching?true:false}>Sign-In</button>

                    {/*here we are getting a track of what are we typing in those boxes*/}

                    {/* <h5 className="credential_name">Password</h5>
            <input  className="input_box" type="password" placeholder="Type your password" value={password} onChange={e=>setPassword(e.target.value)}/>
            <button className="loginsign_button"  type="submit" onClick={signIn}>Sign-In</button> */}
                </form>
                <p className="login_info">
                    By continuing, you agree to Amazon's

                    <a href={anchLink} style={{
                        color: "blue"
                    }}> Conditions of Use </a>
                    and <Link to="/" style={{
                        color: "blue"
                    }}>Privacy Notice</Link>.
                    <br></br>
                    <br></br>
                    <Link to="/" style={{
                        color: "blue"
                    }}>Need help?</Link>
                </p>
            </div>
            <br></br>
            <Link to="/register" style={{
                color: "blue"
            }}>
                <button className="loginregister_button">Create your Amazon account</button>
            </Link>
        </div>
    )
}
