import React from "react";
import { Link } from "react-router-dom";

function SignUpPage(props){
    const [signUpInfo,setsignUpInfo] = React.useState({name:"",house_number:"",email:"",mobile_number:"",password:"",reenter_password:""});

    function updateSignUpInfo(event){
        const parameter = event.target.name;
        const value = event.target.value;

        setsignUpInfo((prevInfo)=>{return {...prevInfo,[parameter]:value};});
    }

    return (<div className="login-box">
        <div className="signup-box-inner">
            <img src="./images/house-icon.png" alt="house-icon" height={70}/>
            <h1>Create A New Account</h1>
            <form className="login-data" method="POST" action="/add-user">
                <div className="input-data">
                    <input className="login-input name" type="text" name="name" placeholder="Name" onChange={updateSignUpInfo} value={signUpInfo.name} required/>
                    <label className="name-label"><img className="login-icons" src="./images/person.svg" alt="name icon"/></label>
                </div>
                <div className="input-data">
                    <input className="login-input house-number" type="text" name="house_number" placeholder="House Number" onChange={updateSignUpInfo} value={signUpInfo.house_number} required/>
                    <label className="house-label"><img className="login-icons" src="./images/house.svg" alt="house icon"/></label>
                </div>
                <div className="input-data">
                    <input className="login-input email" type="email" name="email" placeholder="Email ID" onChange={updateSignUpInfo} value={signUpInfo.email}/>
                    <label className="email-label"><img className="login-icons" src="./images/email.svg" alt="email icon"/></label>
                </div>
                <div className="input-data">
                    <input className="login-input mobile_number" type="text" name="mobile_number" placeholder="Mobile Number" onChange={updateSignUpInfo} value={signUpInfo.mobile_number} required/>
                    <label className="mobile-number-label"><img className="login-icons" src="./images/telephone.svg" alt="phone-number icon"/></label>
                </div>
                <div className="input-data">
                    <input className="login-input password" type="password" name="password" placeholder="Password" onChange={updateSignUpInfo} value={signUpInfo.password} required/>
                    <label className="house-label"><img className="login-icons" src="./images/lock.svg" alt="lock icon"/></label>
                </div>
                <div className="input-data">
                    <input className="login-input reenter-password" type="password" name="reenter_password" placeholder="Re-enter the password" onChange={updateSignUpInfo} value={signUpInfo.reenter_password} required/>
                    <label className="house-label"><img className="login-icons" src="./images/lock.svg" alt="lock icon"/></label>
                </div>

                <button type="submit" className="login-submit-button">Create Account</button>
            </form>
        </div>
    </div>)
}

export default SignUpPage;