import React, { useState } from 'react'
import "./Register.css"
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../store/services/authService"
import { useEffect } from 'react';
import { Alert } from "@mui/material"

export const Register = () => {
  const anchLink = `https://amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940`;
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("")
  const [showError, setShowError] = useState(false);

  const [password, setPassword] = useState('');
  const [reenterPassword, setReenderPassword] = useState('');
  const [registerUser, { data, error, isFetching }] = useRegisterUserMutation()
  const navigate = useNavigate()


  const signIn = async (e) => {
    e.preventDefault()
    if (name !== "" && email !== "" && password.length >= 6 && password === reenterPassword) {
      await registerUser({
        fullname: name,
        mobile: email,
        password
      })
    } else if (name === "") {
      triggerError("name cannot be empty")
    } else if (email === "") {
      triggerError("mobile number  cannot be empty")

    } else if (password.length < 6) {
      triggerError("password  should be greater than five characters")
    } else if (password !== reenterPassword) {
      triggerError("passwords do not match")

    }
  }



  useEffect(() => {
    if (data) {
      console.log("data");
      return navigate("/login")
    }
  }, [data])

  useEffect(() => {
    if (error) {
      const time = triggerError("credentials are not eligible ,try diffrent credentials ")
      setEmail("")
      setPassword("")
      setName("")
      setReenderPassword("")
      return () => clearTimeout(time)
    }
  }, [error])

  const triggerError = (message) => {
    setMessage(`${message}`)
    setShowError(true)
    const time = setTimeout(() => {
      setShowError(false)
      setMessage("")
    }, 3000)
    return time
  }
  return (<>
    {showError ? <Alert severity="error" style={{
      position: "absolute",
      top: "20px",
      left: "50%",
    transform:"translate(-50%,0)"
    }}>
      {message}
    </Alert> : ""}
    <div className="login">
      <Link to="/">
        <img className="login__img" src="https://th.bing.com/th/id/OIP.Ku4iy6JfyZOZAKxOkfp0ewHaEK?pid=ImgDet&rs=1" alt="Signup" />
      </Link>
      <div className="login__container">
        <h1 className="login__sign">Create account</h1>
        <form>
          <h5 className="credential_name" id="mailText">Your Name</h5>
          <input type="text" className="input_box" value={name} id="mailBox" onChange={e => setName(e.target.value)} style={{ background: "white" }} placeholder="First and Last Name" />

          <h5 className="credential_name" id="mailText">Mobile number or email</h5>
          <input type="text" className="input_box" value={email} id="mailBox" onChange={e => setEmail(e.target.value)} style={{ background: "white" }} />

          <h5 className="credential_name" id="mailText">Password</h5>
          <input type="password" className="input_box" value={password} id="mailBox" onChange={e => setPassword(e.target.value)} style={{ background: "white" }} placeholder="At least 6 characters" />
          <p className='password_info'><span>i</span>Passwords must be at least 6 characters.</p>

          <h5 className="credential_name" id="mailText">Re-enter password</h5>
          <input type="password" className="input_box" value={reenterPassword} id="mailBox" onChange={e => setReenderPassword(e.target.value)} style={{ background: "white" }} />

          <button id="Continuebutton" onClick={signIn} >sign up</button>

        </form>
        <p className="login_info">
          By creating an account, you agree to Amazon's

          <a href={anchLink} style={{
            color: "blue"
          }}> Conditions of Use </a>and <Link to="/" style={{
            color: "blue"
          }}>Privacy Notice</Link>.
          <br></br>
          <br></br>
        </p>
        <hr style={{ width: '80%', margin: 'auto' }} />

        <p className="login_info">
          By creating an account or logging in, you agree to Amazon’s <Link to="/" style={{
            color: "blue"
          }}>Conditions of Use</Link> and <Link to="/" style={{
            color: "blue"
          }}>Privacy Policy.</Link>
        </p>

      </div>
      <br></br>

    </div>
  </>
  )
}
