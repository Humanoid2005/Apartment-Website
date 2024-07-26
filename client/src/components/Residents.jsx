import React from "react";
import useFetch from "./useFetch";
import LoadingPage from "./LoadingPage";

function Residents(props){
    const {data:ResidentData,pending,error} = useFetch("http://localhost:8000/api/residents-data");

    if(error){
        return <h1>{error}</h1>
    }

    return (pending==false?<div className="resident-box">
        {ResidentData.map((item,index)=>{
            return <div key = {index} className="resident-data">
                <h3>{item.house_number}</h3>
                <h3>Owner: {item.owner}</h3>
                <h3>Resident: {item.resident}</h3>
                {props.verified&&<h3>Email ID: {item.email}</h3>}
            </div>
        })}
    </div>:<LoadingPage message={"Loading Residents Information..."}/>)
}
export default Residents;