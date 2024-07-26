import React from "react";

function About(){
    return (
        <div className="about-screen">
            <div className="location-info">
                <h1>Location</h1>
                <div className="location-box">
                    <h3>164,Sowgandhika Apartments, 1st main road, Sheshadripuram,Opp. Blue Bliss Hospital, Bangalore-560020, Karnataka</h3>
                    <a target="_blank" href="https://maps.app.goo.gl/usxrGLyCsqTG5bTh7"><img src="/images/maps.jpg" height={50}/></a>
                </div>
            </div>
            <div className="contact-info">
                <h1>Contact Us</h1>
                <div className="contact-box">
                    <h2>Mobile Number: <span className="number-span">9901491176, 9686239115</span></h2>
                </div>
            </div>
        </div>
    )
}

export default About;