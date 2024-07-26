import React from "react";
import { Link, useLocation } from "react-router-dom";


function Navbar(){
    return <nav>
        <div className="apt-name">
            <div className="apt-box-1">
            <Link className="nav-option home" to="/"><img src="./images/sowgandhika-apartments-logo.png" height={30}/></Link>
            <Link className="nav-option owners" to="/residents">View Residents</Link>
            <Link className="nav-option contact" to="/about-us">About Us</Link>
            </div>
        </div>
    </nav>
}

export default Navbar;