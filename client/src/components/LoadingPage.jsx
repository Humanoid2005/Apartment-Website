import React from "react";


function LoadingPage(props){
    return (
        <div className="loading-box">
            <img className="loading-image" src="/images/Spinner.svg" height={80}/>
            <h1 className="loading text">{props.message}</h1>
        </div>
    )
}

export default LoadingPage;