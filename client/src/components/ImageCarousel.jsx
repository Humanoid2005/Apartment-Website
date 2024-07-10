import React, { useEffect } from "react";


function ImageCarousel(props){
    const [id,setid] = React.useState(0);

    React.useEffect(()=>{
        console.log(id);
        const SetImage = setInterval(()=>{;setid((id+1)%props.imgArray.length);},10000);
        return ()=>clearInterval(SetImage);
    },[id,props.imgArray.length]);

    return (<div className="image-carousel">
        <img src={props.imgArray[id]} className="carousel-image" height={500} alt="carousel-image"/>        
    </div>)
}

export default ImageCarousel;