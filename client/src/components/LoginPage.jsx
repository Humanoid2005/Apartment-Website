import React from "react";

function LoginPage(props){



    return (<div className="login-box">
        <div className="login-box-inner">
            <img src="./images/house-icon.png" alt="house-icon" height={70}/>
            <h1>Log In</h1>
            <form className="login-data" method="POST">
                <div className="input-data">
                    <input className="login-input house-number" type="text" name="house-number" placeholder="House Number"/>
                    <label className="house-label"><img className="login-icons" src="./images/house.svg" alt="house icon"/></label>
                </div>
                <div className="input-data">
                    <input className="login-input password" type="password" name="password" placeholder="Password"/>
                    <label className="house-label"><img className="login-icons" src="./images/lock.svg" alt="lock icon"/></label>
                </div>
                <a className="forgot-password-link" href="/forgot-password">Forgot Password</a>
                <a className="signup-redirect-link" href="/sign-up">New Here ? Create Account</a>
                <button type="submit" className="login-submit-button">Login</button>
            </form>
        </div>
    </div>)
}

export default LoginPage;