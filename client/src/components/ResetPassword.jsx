import React from "react";
import { Link } from "react-router-dom";

function ResetPassword(props){
    const [newPassword,setnewPassword] = React.useState({reenter_password:"",password:""});

    function updatePasswordInfo(event){
        const parameter = event.target.name;
        const value = event.target.value;

        setnewPassword((prevInfo)=>{return {...prevInfo,[parameter]:value};});
    }

    return (<div className="login-box">
        <div className="login-box-inner">
            <img src="/images/house-icon.png" alt="house-icon" height={70}/>
            <h1>Reset Password</h1>
            <form className="login-data" method="POST" action={"http://localhost:8000/api/reset-password/"+window.location.pathname.split("/").at(-1)}>
                <div className="input-data">
                    <input className="login-input password" type="password" name="password" placeholder="New Password" onChange={updatePasswordInfo} value={newPassword.password} required/>
                    <label className="house-label"><img className="login-icons" src="/images/lock.svg" alt="lock icon"/></label>
                </div>
                <div className="input-data">
                    <input className="login-input password" type="password" name="reenter_password" placeholder="Re-enter Password" onChange={updatePasswordInfo} value={newPassword.reenter_password} required/>
                    <label className="house-label"><img className="login-icons" src="/images/lock.svg" alt="lock icon"/></label>
                </div>
                <button type="submit" className="login-submit-button">Reset Password</button>
            </form>
        </div>
    </div>)
}

export default ResetPassword;
