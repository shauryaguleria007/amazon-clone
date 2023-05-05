import React, { useState } from 'react'
import "./Register.css"
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const anchLink = `https://amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940`;
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenderPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault()
  }

  return (
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

          <Link to='/'>
            <button id="Continuebutton" >Continue</button>
          </Link>
          <button className="loginsign_button" id="signInbutton" type="submit" onClick={signIn} style={{ display: "none" }}>Sign-In</button>

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
  )
}
