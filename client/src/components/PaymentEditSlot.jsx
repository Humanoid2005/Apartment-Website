import React from "react";


function PaymentEditFrame(props){
    const [editdata,seteditdata] = React.useState(false);
    const [changedvalue,setchangedvalue] = React.useState("");

    return (
        editdata?<div className="edit-profile-data" style={{backgroundColor:props.bgcolor}}>
            <form className="form-edit-profile" action={props.url} method="POST" style={{backgroundColor:props.bgcolor}}>
                <h3 style={{backgroundColor:props.bgcolor,color:props.headingcolor}}><span className="payment-heading" style={{backgroundColor:props.bgcolor,color:props.headingcolor}}>{props.title}</span></h3>
                <button style={{backgroundColor:props.bgcolor}} className="close-edit-profile" onClick={(event)=>{event.preventDefault();seteditdata(false);setchangedvalue("");}}><img className="close-edit-profile-image" src="/images/close.png" height={20} style={{backgroundColor:props.bgcolor}}/></button>
                <input type={props.isDate?"date":"text"} name = {props.valueName}  onChange={(event)=>{setchangedvalue(event.target.value)}} value={changedvalue} placeholder={props.title} className="input-edit-profile"/>
                <button style={{backgroundColor:props.bgcolor}} type="submit" className="save-edit-profile"><img className="save-edit-profile-image" src="/images/check-button.png" height={20} style={{backgroundColor:props.bgcolor}}/></button>
            </form>
        </div>:
        <div className="show-profile-data payment-edit-frame" style={{backgroundColor:props.bgcolor}}>
            <h3 style={{backgroundColor:props.bgcolor}}><span className="payment-heading" style={{backgroundColor:props.bgcolor,color:props.headingcolor}}>{props.title}</span></h3>
            <h3 style={{backgroundColor:props.bgcolor}}>{props.data}</h3>
            <button className="open-edit-profile" onClick={()=>{seteditdata(true)}}  style={{backgroundColor:props.bgcolor}}><img className="open-edit-profile-image" src="/images/edit.png" height={20} style={{backgroundColor:props.bgcolor}}/></button>
        </div>
    )

}

export default PaymentEditFrame;