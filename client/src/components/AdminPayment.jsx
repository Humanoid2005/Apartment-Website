import React from "react";
import {Link} from "react-router-dom";
import useFetch from "./useFetch";
import LoadingPage from "./LoadingPage";
import PaymentEditFrame from "./PaymentEditSlot";
import DeleteBill from "./DeleteBill";


function AdminPayment(){
    const [filter,setfilter] = React.useState("");
    const [searchbar,setsearchbar] = React.useState("");
    const {data:bills,loading,error} = useFetch("http://localhost:8000/api/bills");

    if(error){
        return <LoadingPage message={"Loading..."}/>;
    }

    return (loading?<LoadingPage message={"Loading your bills..."}/>:
        <div className="payment-page">
            <div className="payment-types">
                <h3 className="pending-payments-select" onClick={()=>{setfilter("pending")}} style={{textDecoration:"underline"}}>Pending</h3>
                <h3 className="completed-payments-select" onClick={()=>{setfilter("completed")}} style={{textDecoration:"underline"}}>Completed</h3>
                <Link to="/admin/add-bills" className="add-bill-link">Add Bill</Link>
            </div>
            <div className="search-bar">
                <input className="search-bar-input" type="text" name="search-filter" placeholder="Search" onChange={(event)=>{setsearchbar(event.target.value)}} value={searchbar}/>
            </div>
            <div className="bills-section">
                {bills?(bills.filter((item)=>{
                    if(filter==""){
                        return true;
                    }
                    if(filter=="pending"){
                        return item.pending==true;
                    }
                    if(filter=="completed"){
                        return item.pending==false;
                    }
                }).filter((item)=>{
                    const formatted_date = new Date(item.deadline).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })
                    if(searchbar!=""){
                        return item.house_number.toLowerCase().includes(searchbar.toLowerCase()) || (item.amount==searchbar.toLowerCase()) || (item.type.toLowerCase().includes(searchbar.toLowerCase())) || (formatted_date.toLowerCase().includes(searchbar.toLowerCase())) || (item.bill_number.toLowerCase().includes(searchbar.toLowerCase()));
                    }
                    return true;
                }).map((bill,index)=>{
                    const boxcolor = bill.pending?"#FF4C4C":"#A3FFD6";
                    const headingcolor = bill.pending?"#F3FEB8":"#8576FF";
                    const formatted_date = new Date(bill.deadline).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    return (<div key={index} className="bill-item"  style={{backgroundColor:boxcolor}}>
                            {(bill.pending==false)&&<div className="check-button-div" style={{backgroundColor:boxcolor}}><img src="/images/check-button.png" height={30} style={{backgroundColor:boxcolor}}/></div>}
                            {bill.pending==false?<DeleteBill bill_id = {bill.bill_number} bgcolor={boxcolor} />:null}
                            <h3 style={{backgroundColor:boxcolor}}><span className="payment-heading" style={{backgroundColor:boxcolor,color:headingcolor}}>Bill ID:</span> {bill.bill_number}</h3>
                            {bill.pending==true?<DeleteBill bill_id = {bill.bill_number} bgcolor={boxcolor} house_number={bill.house_number}/>:null}
                            <PaymentEditFrame url={"http://localhost:8000/api/admin/payments/"+`${bill.house_number}`+`${bill.bill_number}`} title="Type: " valueName="type" data={bill.type} bgcolor={boxcolor} headingcolor={headingcolor}/>
                            <h3 style={{backgroundColor:boxcolor}}><span className="payment-heading" style={{backgroundColor:boxcolor,color:headingcolor}}>House Number:</span> {bill.house_number}</h3>
                            <PaymentEditFrame url={"http://localhost:8000/api/admin/payments/"+`${bill.house_number}`+`${bill.bill_number}`} title="Payment Deadline: " valueName="deadline" data={formatted_date} bgcolor={boxcolor} isDate={true} headingcolor={headingcolor}/>
                            {bill.pending?<PaymentEditFrame url={"http://localhost:8000/api/admin/payments/"+`${bill.house_number}`+`${bill.bill_number}`} title="Payment Amount: " valueName="amount" data={bill.amount} bgcolor={boxcolor} headingcolor={headingcolor}/>:<h3 style={{backgroundColor:boxcolor}}><span className="payment-heading" style={{backgroundColor:boxcolor}}>Payment Amount:</span> {bill.amount}</h3>}
                            {bill.pending?null:<form className="view-bill" style={{backgroundColor:boxcolor}} action={`http://localhost:8000/api/generate-receipt/${bill.house_number}${bill.bill_number}`} method="POST">
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

export default AdminPayment;