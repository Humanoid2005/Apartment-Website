import React from "react";

function ForgotPassword(props){
    const [house_number,sethouse_number] = React.useState("");

    function updateForgotInfo(event){
        const house = event.target.value
        sethouse_number(house);
    }

    return (
    <div className="forgot-password-div">
        <div className="login-box">
            <div className="login-box-inner">
                <img src="./images/house-icon.png" alt="house-icon" height={70}/>
                <h1>Forgot Password</h1>
                <form className="login-data" method="POST" action="/forgot-password">
                    <div className="input-data">
                        <input className="login-input house-number" type="text" name="house_number" placeholder="House Number" onChange={updateForgotInfo} value={house_number} required/>
                        <label className="house-label"><img className="login-icons" src="./images/house.svg" alt="house icon"/></label>
                    </div>
                    <button type="submit" className="login-submit-button">Reset Password</button>
                </form>
            </div>
        </div>
    </div>)
}

export default ForgotPassword;