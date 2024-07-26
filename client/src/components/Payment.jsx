import React from "react";
import useFetch from "./useFetch";
import LoadingPage from "./LoadingPage";
import { useAuth } from "../Contexts/AuthContext";

function Payment(){
    const {houseNumber:house_number} = useAuth();
    const [filter,setfilter] = React.useState("");
    const [searchbar,setsearchbar] = React.useState("");
    const {data:bills,loading,error} = useFetch("http://localhost:8000/api/bills");

    if(error){
        return <LoadingPage message={error}/>;
    }

    return (loading?<LoadingPage message={"Loading your bills..."}/>:
        <div className="payment-page">
            <div className="payment-types">
                <h3 className="pending-payments-select" onClick={()=>{setfilter("pending")}} style={{textDecoration:"underline"}}>Pending</h3>
                <h3 className="completed-payments-select" onClick={()=>{setfilter("completed")}} style={{textDecoration:"underline"}}>Completed</h3>
            </div>
            <div className="search-bar">
                <input className="search-bar-input" type="text" name="search-filter" placeholder="Search" onChange={(event)=>{setsearchbar(event.target.value)}} value={searchbar}/>
            </div>
            <div className="bills-section">
                {bills?(bills.filter((item)=>{
                    if(filter=="" && item.house_number==house_number){
                        return true;
                    }
                    if(filter=="pending" && item.house_number==house_number){
                        return item.pending==true;
                    }
                    if(filter=="completed" && item.house_number==house_number){
                        return item.pending==false;
                    }
                }).filter((item)=>{
                    const formatted_date = new Date(item.deadline).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })
                    if(searchbar!=""){
                        return (item.house_number.toLowerCase().includes(searchbar.toLowerCase())) || (item.amount==searchbar.toLowerCase()) || (formatted_date.toLowerCase().includes(searchbar.toLowerCase())) || (item.bill_number.toLowerCase().includes(searchbar.toLowerCase())) || (item.type.toLowerCase().includes(searchbar.toLowerCase()));
                    }
                    return true;
                }).map((bill,index)=>{
                    const boxcolor = bill.pending?"orangered":"green";
                    const formatted_date = new Date(bill.deadline).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })
                    console.log(typeof bill.deadline);
                    console.log(bill.deadline.toLocaleString().split(",")[0]);
                    return (<div key={index} className="bill-item"  style={{backgroundColor:boxcolor}}>
                            {(bill.pending==false)&&<div className="check-button-div" style={{backgroundColor:boxcolor}}><img src="/images/check-button.png" height={30} style={{backgroundColor:boxcolor}}/></div>}
                            <h3 style={{backgroundColor:boxcolor}}><span className="payment-heading" style={{backgroundColor:boxcolor}}>Bill ID:</span> {bill.bill_number}</h3>
                            <h3 style={{backgroundColor:boxcolor}}><span className="payment-heading" style={{backgroundColor:boxcolor}}>Type:</span> {bill.type}</h3>
                            <h3 style={{backgroundColor:boxcolor}}><span className="payment-heading" style={{backgroundColor:boxcolor}}>House Number:</span> {bill.house_number}</h3>
                            <h3 style={{backgroundColor:boxcolor}}><span className="payment-heading" style={{backgroundColor:boxcolor}}>Payment Deadline:</span> {formatted_date}</h3>
                            <h3 style={{backgroundColor:boxcolor}}><span className="payment-heading" style={{backgroundColor:boxcolor}}>Payment Amount:</span> {bill.amount}</h3>
                            {bill.pending?<form className="payment-form" style={{backgroundColor:boxcolor}} action={`/api/payment-verified/${bill.house_number}${bill.bill_number}`} method="POST">
                                <input type="hidden" name="bill_id" value={bill.bill_number}/>
                                <input type="hidden" name="house_number" value={bill.house_number}/>
                                <button className="payment-button">Pay Now</button>
                            </form>:<form className="view-bill" style={{backgroundColor:boxcolor}} action={`/api/generate-receipt/${bill.house_number}${bill.bill_number}`} method="POST">
                                <input type="hidden" name="bill_id" value={bill.bill_number}/>
                                <input type="hidden" name="house_number" value={bill.house_number}/>
                                <button className="view-bill-button">View Bill</button>
                            </form>
                            }
                    </div>)
                })):<h1>No bills yet...</h1>}
            </div>
        </div>
    )
}

export default Payment;