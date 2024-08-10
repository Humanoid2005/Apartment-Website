import React from "react";
import useFetch from "./useFetch";
import LoadingPage from "./LoadingPage";

function Announcements(props){
    const [editMode,seteditMode] = React.useState(false);
    const [addMode,setaddMode] = React.useState(false);
    const [title,settitle] = React.useState("");
    const [information,setinformation] = React.useState("");
    const [addtitle,setaddtitle] = React.useState("");
    const [addinformation,setaddinformation] = React.useState("");
    const {data:AnnouncementData,pending,error} = useFetch("https://apartment-website-production.up.railway.app/api/announcements");

    if(error){
        return <LoadingPage message={"Loading..."}/>
    }

    return (pending==false?<div className="announcement-box">
        <h1>Announcements ({AnnouncementData.length})</h1>
        {props.isAdmin&&<div className="add-announcement">
            {addMode==false?<div className="add-option"><h1>Add announcement</h1><button className="add-button use-buttons" onClick={()=>{setaddMode(true)}}><img className="add-image" src="/images/add.png" height={30}/></button></div>:
                        <div className="add-box">
                            <div className="close-button-box">
                                <button className="close-button use-buttons" onClick={()=>{setaddMode(false)}}><img className="close-image" src="/images/close.png" height={30}/></button>
                            </div>
                            <h1>Add Announcement</h1>
                            <form className="add-form-add" action="https://apartment-website-production.up.railway.app/api/announcements" method="POST">
                                <input className="announcement-edit-input" type="text" name="title" placeholder="Announcement Title" value={addtitle} onChange={(event)=>{setaddtitle(event.target.value)}} required/>
                                <textarea className="announcement-edit-input textarea-input" name="information" value={addinformation} placeholder="Announcement" onChange={(event)=>{setaddinformation(event.target.value)}} required/>
                                <input className="announcement-edit-input" type="hidden" value={new Date().toLocaleDateString('en-GB', {day: '2-digit',month: '2-digit',year: 'numeric'})}/>
                                <button className="announcement-edit-submit use-buttons" type="submit"><img className="submit-button" src="/images/check-button.png" height={30}/></button>
                            </form>
                        </div>
            }
        </div>}
        {AnnouncementData.map((item,index)=>{
            return <div key = {index} className="resident-data">
                <h1>{item.title}</h1>
                <p>Date: {new Date(item.DOA).toLocaleDateString('en-GB', {day: '2-digit',month: '2-digit',year: 'numeric'})}</p>
                <h3>{item.information}</h3>
                {props.isAdmin&&(editMode?<div className="edit-box">
                    <div className="close-button-box">
                        <button className="close-button use-buttons" onClick={()=>{seteditMode(false)}}><img className="close-image" src="/images/close.png" height={30}/></button>
                    </div>
                    <h1>Edit Announcement</h1>
                    <form  className="edit-form" method="POST" action={"https://apartment-website-production.up.railway.app/api/announcements/"+item._id}>
                        <input className="announcement-edit-input" type="text" name="title" placeholder="Announcement Title" value={title} onChange={(event)=>{settitle(event.target.value)}}/>
                        <textarea className="announcement-edit-input textarea-input" name="information" value={information} placeholder="Announcement" onChange={(event)=>{setinformation(event.target.value)}}/>
                        <input className="announcement-edit-input" type="hidden" value={new Date().toLocaleDateString('en-GB', {day: '2-digit',month: '2-digit',year: 'numeric'})}/>
                        <button className="announcement-edit-submit use-buttons" type="submit"><img className="submit-button" src="/images/check-button.png" height={30}/></button>
                    </form>
                    </div>
                    :<div className="CRUD-box">
                    <button className="edit-button use-buttons" onClick={()=>{seteditMode(!editMode)}}><img className="edit-image" src="/images/edit.png" height={30}/></button>
                    <form method="POST" action={"https://apartment-website-production.up.railway.app/api/delete-announcements/"+item._id}>
                        <button className="delete-button use-buttons" ><img className="delete-image" src="/images/delete.png" height={30}/></button>
                    </form>
                </div>)}
            </div>
        })}
    </div>:<LoadingPage message={"Loading Announcements..."}/>)
}
export default Announcements;