import React from "react";
import useFetch from "./useFetch";
import LoadingPage from "./LoadingPage";
import { useAuth } from "../Contexts/AuthContext";

function FilesUpload(){
    const {houseNumber:house_number} = useAuth();
    const [searchbar,setsearchbar] = React.useState("");
    const [addfile,setaddfile] = React.useState(false);
    const [filename,setfilename] = React.useState("");
    const {data:files,pending,error} = useFetch("http://localhost:8000/api/user-documents");


    if(error){
        <LoadingPage message={"Loading..."}/>
    }

    return (pending?<LoadingPage message={"Loading your files..."}/>:
        <div className="user-file-data">
            {addfile?<form  className="add-file-form" action="http://localhost:8000/api/user-documents" method="POST" enctype="multipart/form-data">
                <input className="user-document-file-input" type="file" name="filesrc" placeholder="Drop your file"/>
                <input className="user-document-filename-input" type="text" name="filename" value={filename} onChange={(event)=>{setfilename(event.target.value)}} placeholder="File Name"/>
                <button type="submit" className="user-document-submit-button">Add File</button>
            </form>:<button className="user-document-submit-button" onClick={()=>{setaddfile(true)}}>Add File</button>}
            <div className="search-bar">
                <input className="search-bar-input" type="text" name="search-filter" placeholder="Search" onChange={(event)=>{setsearchbar(event.target.value)}} value={searchbar}/>
            </div>
            <div className="user-files">
                {files!=null?files.filter((file)=>{return file.name.toLowerCase().includes(searchbar.toLowerCase())&&file.house_number==house_number}).map((file)=>{
                    return (<div className="intermediate-file-div">
                        <div className="user-file">
                            <h3 className="file-name">{file.name}</h3>
                            <div className="file-icons">
                                <form className="download-file" action={"http://localhost:8000/api/download-user-documents/"+file.file_id} method="POST">
                                    <button type="submit" className="download-button"><img src="/images/download-button.png" height={30}/></button>
                                </form>
                                <form className="delete-file" action={"http://localhost:8000/api/delete-user-documents/"+file.file_id} method="POST">
                                    <button type="submit" className="delete-button"><img src="/images/delete.png" height={30}/></button>
                                </form>
                            </div>
                        </div>
                        <hr/>
                    </div>);
                }):null}
            </div>
        </div>
    )
}

export default FilesUpload;