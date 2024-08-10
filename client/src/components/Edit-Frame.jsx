import React from "react";


function EditFrame(props){
    const [editdata,seteditdata] = React.useState(false);
    const [changedvalue,setchangedvalue] = React.useState("");
    const [changedvalue2,setchangedvalue2] = React.useState("");

    return (
        editdata?<div className="edit-profile-data">
            <form className="form-edit-profile" action={props.isPassword?"https://apartment-website-production.up.railway.app/api/user-details/change-password":"https://apartment-website-production.up.railway.app/api/user-details"} method="POST">
                <h3>{props.title}</h3>
                <button className="close-edit-profile" onClick={(event)=>{event.preventDefault();seteditdata(false);setchangedvalue("");}}><img className="close-edit-profile-image" src="/images/close.png" height={30}/></button>
                <input type={props.isPassword?"password":"text"} name = {props.valueName}  onChange={(event)=>{setchangedvalue(event.target.value)}} value={changedvalue} placeholder={props.title} className="input-edit-profile"/>
                {props.isPassword&&<input type={props.isPassword?"password":"text"} name = "reenter_password"  onChange={(event)=>{setchangedvalue2(event.target.value)}} value={changedvalue2} placeholder="Re-enter password" className="input-edit-profile"/>}
                <button type="submit" className="save-edit-profile"><img className="save-edit-profile-image" src="/images/check-button.png" height={30}/></button>
            </form>
        </div>:
        <div className="show-profile-data">
            <h3>{props.title}</h3>
            <h3>{props.data}</h3>
            <button className="open-edit-profile" onClick={()=>{seteditdata(true)}}><img className="open-edit-profile-image" src="/images/edit.png" height={30}/></button>
        </div>
    )

}

export default EditFrame;