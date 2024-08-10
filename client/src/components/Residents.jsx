import React from "react";
import useFetch from "./useFetch";
import LoadingPage from "./LoadingPage";

function Residents(props){
    const {data:ResidentData,pending,error} = useFetch("https://apartment-website-production.up.railway.app/api/residents-data");
    const [searchbar,setsearchbar] = React.useState("");

    if(error){
        return <LoadingPage message={"Loading..."}/>
    }

    return (pending==false?<div className="residents-div">
        <div className="resident-search-bar">
            <input className="search-bar-input" type="text" name="search-filter" placeholder="Search" onChange={(event)=>{setsearchbar(event.target.value)}} value={searchbar}/>
        </div>
        <div className="resident-box">
        {ResidentData.filter((item)=>{
            if(searchbar!=""){
                return item.house_number.toLowerCase().includes(searchbar.toLowerCase())||item.resident.toLowerCase().includes(searchbar.toLowerCase())||item.owner.toLowerCase().includes(searchbar.toLowerCase());
            }
            return true;
        })
        .map((item,index)=>{
            return <div key = {index} className="resident-data">
                {item.resident=="none"&&item.owner=="none"?<h1 className="house-for-sale">FOR SALE</h1>:null}
                {item.resident=="none"?<h1 className="house-for-rent">FOR RENT</h1>:null}
                <h3>{item.house_number}</h3>
                <h3>Owner: {item.owner}</h3>
                <h3>Resident: {item.resident}</h3>
                {item.resident=="none"||item.owner=="none"?<h3><span className="contact-for-details">Contact for details:</span> {item.email}</h3>:null}
                {props.verified&&item.resident!="none"&&item.owner!="none"?<h3>Email ID: {item.email}</h3>:null}
            </div>
        })}
    </div></div>:<LoadingPage message={"Loading Residents Information..."}/>)
}
export default Residents;