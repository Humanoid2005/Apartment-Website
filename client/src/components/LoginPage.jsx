import React from "react";
import { Link } from "react-router-dom";

function LoginPage(props){
    const [loginInfo,setloginInfo] = React.useState({house_number:"",password:""});

    function updateLoginInfo(event){
        const parameter = event.target.name;
        const value = event.target.value;

        setloginInfo((prevInfo)=>{return {...prevInfo,[parameter]:value};});
    }

    return (<div className="login-box">
        <div className="login-box-inner">
            <img src="./images/house-icon.png" alt="house-icon" height={70}/>
            <h1>Login</h1>
            <form className="login-data" method="POST" action="https://apartment-website-production.up.railway.app/api/check-user">
                <div className="input-data">
                <label className="house-label"><img className="login-icons" src="./images/house.svg" alt="house icon"/></label>
                    <input className="login-input house-number" type="text" name="house_number" placeholder="House Number" onChange={updateLoginInfo} value={loginInfo.house_number} required/>
                </div>
                <div className="input-data">
                <label className="house-label"><img className="login-icons" src="./images/lock.svg" alt="lock icon"/></label>
                    <input className="login-input password" type="password" name="password" placeholder="Password" onChange={updateLoginInfo} value={loginInfo.password} required/>
                </div>
                <Link className="forgot-password-link" to="/forgot-password">Forgot Password</Link>
                <Link className="signup-redirect-link" to="/sign-up">New Here ? Create Account</Link>
                <button type="submit" className="login-submit-button">Login</button>
            </form>
        </div>
    </div>)
}

export default LoginPage;