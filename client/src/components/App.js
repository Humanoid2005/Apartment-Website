import React from "react";
import ImageCarousel from "./ImageCarousel";
import LoginPage from "./LoginPage";

function App() {
  const imgArray = ["./images/carousel-image-1.jpg","./images/carousel-image-2.jpg","./images/carousel-image-3.jpg"];
  return (
    <div className="App">
      <div className="login-grid">
        <LoginPage/>
        <ImageCarousel imgArray={imgArray}/>
      </div>
    </div>
  );
}

export default App;
