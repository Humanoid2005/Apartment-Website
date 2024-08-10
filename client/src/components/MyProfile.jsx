import React from "react";
import useFetch from "./useFetch";
import EditFrame from "./Edit-Frame";
import LoadingPage from "./LoadingPage";
import Modal from "./Modal";



function MyProfile(){
    const imageRef = React.useRef(null);
    const {data:ProfileData,pending,error} = useFetch("https://apartment-website-production.up.railway.app/api/profile-details");
    const {data:ImageURL,pending:ImagePending,error:ImageError} = useFetch("https://apartment-website-production.up.railway.app/api/profile-image");
    const [image,setimage] = React.useState(null);

    React.useEffect(()=>{
        setimage(ImageURL);
    },[ImageURL,ImagePending,ImageError])

    function handleImageClick(){
        imageRef.current.click();
    }

    function handleImage(){
        document.querySelector(".submit-profile-image").click();
    }

    if(error){
        return <LoadingPage message={"Loading..."}/>
    }

    return (
        pending?<LoadingPage message={"Loading Profile..."}/>:<div className="my-profile">
            <form action="https://apartment-website-production.up.railway.app/api/profile-image" method="POST" enctype="multipart/form-data">
                <input type="file" ref={imageRef} onChange={handleImage} name="imagesrc" style={{display:"none"}}/>
                <button className="submit-profile-image" type="submit" style={{display:"none"}} />
            </form>
            {image?<img className="profile-image" src={"https://apartment-website-production.up.railway.app/uploads/profile-images/"+image} onClick={handleImageClick} height={200}/>:<img className="profile-image" src="/images/user.png" onClick={handleImageClick} height={200}/>}
            <h1 className="profile-info-house-number">{ProfileData.house_number}</h1>
            <EditFrame valueName="name" title="Name: " data={ProfileData.name} isPassword={false}/>
            <EditFrame valueName="mobile_number" title="Mobile Number: " data={ProfileData.mobile_number} isPassword={false}/>
            <EditFrame valueName="email" title="Email ID: " data={ProfileData.email} isPassword={false}/>
            <EditFrame valueName="password" title="Password: " data={"*****************"} isPassword={true}/>
            <Modal/>
        </div>
    )
}

export default MyProfile;