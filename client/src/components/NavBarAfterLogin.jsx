import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";


function Navbar(props){
    const {houseNumber:house_number} = useAuth();
    console.log(house_number);
    const announcements_url = house_number=="admin"?"/admin/announcements":"/announcements";
    const payment_url = house_number=="admin"?"/admin/payments":"/payments";

    return <nav>
        <div className="apt-name">
            <div className="apt-box-1">
                <Link className="nav-option home" to={props.home}><img src="/images/sowgandhika-apartments-logo.png" height={30}/></Link>
                <Link className="nav-option owners" to="/residents-loggedIn">View Residents</Link>
                <Link className="nav-option contact" to={announcements_url}>Announcements</Link>
            </div>
            <div className="apt-box-1">
                <Link className="nav-option profile" to={payment_url}>Payments</Link>
                <Link className="nav-option profile" to="/profile">Your Profile</Link>
                <form action="/logout">
                    <button className="logout-button">Logout</button>
                </form>
            </div>
        </div>
    </nav>
}

export default Navbar;