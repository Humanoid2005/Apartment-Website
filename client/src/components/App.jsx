import React from "react";
import { BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import LoginPage from "./LoginPage";
import NavBar from "./Navbar_Homepage";
import SignUpPage from "./SignUpPage";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import About from "./About";
import Residents from "./Residents";
import Announcements from "./Announcements";
import Navbar_AfterLogin from "./NavBarAfterLogin";
import MyProfile from "./MyProfile";
import { AuthProvider } from "../Contexts/AuthContext";
import PrivateRoute from "./PrivateRoutes";
import Payment from "./Payment";
import AdminPayment from "./AdminPayment";
import AddBill from "./AddBill";

function HomePage() {
  const imgArray = ["./images/carousel-image-1.jpg","./images/carousel-image-2.jpg","./images/carousel-image-3.jpg"];
  return (
    <div className="App">
      <NavBar/>
      <div className="login-grid">
        <LoginPage/>
        <ImageCarousel imgArray={imgArray}/>
      </div>
    </div>
  );
}

function SignUp(){
  const imgArray = ["./images/carousel-image-1.jpg","./images/carousel-image-2.jpg","./images/carousel-image-3.jpg"];
  return (
    <div className="App">
      <NavBar/>
      <div className="login-grid">
        <SignUpPage/>
        <ImageCarousel imgArray={imgArray}/>
      </div>
    </div>
  );
}

function AboutPage(){
  const imgArray = ["./images/carousel-image-1.jpg","./images/carousel-image-2.jpg","./images/carousel-image-3.jpg"];
  return (
    <div className="App">
      <NavBar/>
      <div className="login-grid">
        <About/>
        <ImageCarousel imgArray={imgArray}/>
      </div>
    </div>
  );
}

function ResidentsPage(){
  const imgArray = ["./images/carousel-image-1.jpg","./images/carousel-image-2.jpg","./images/carousel-image-3.jpg"];
  return (
    <div className="App">
      <NavBar/>
      <Residents/>
    </div>
  );
}

function ResidentsLoggedInPage(){
  const imgArray = ["./images/carousel-image-1.jpg","./images/carousel-image-2.jpg","./images/carousel-image-3.jpg"];
  return (
    <div className="App">
      <Navbar_AfterLogin/>
      <Residents verified={true}/>
    </div>
  );
}

function ForgotPasswordPage(){
  return (
    <div className="App">
      <NavBar/>
      <ForgotPassword/>
    </div>
  )
}

function ResetPasswordPage(){
  return (
    <div className="App">
      <ResetPassword/>
    </div>
  )
}

function AnnouncementsPageAdmin(){
  return (
    <div className="app">
      <Navbar_AfterLogin/>
      <Announcements isAdmin={true}/>
    </div>
  )
}

function AnnouncementsPage(){
  return (
    <div className="app">
      <Navbar_AfterLogin/>
      <Announcements/>
    </div>
  )
}

function ProfilePage(){
  return (
    <div className="app">
      <Navbar_AfterLogin/>
      <MyProfile/>
    </div>
  )
}

function DummyPage(){
  return (<h1>Dummy Page</h1>);
}

function PaymentPage(){
  return(<div className="app">
    <Navbar_AfterLogin/>
    <Payment/>
  </div>);
}

function AdminPaymentPage(){
  return(<div className="app">
    <Navbar_AfterLogin/>
    <AdminPayment/>
  </div>);
}

function AddBillPage(){
  return(<div className="app">
    <Navbar_AfterLogin/>
    <AddBill/>
  </div>);
}

//<Route path="/profile" element={<PrivateRoute element={DummyPage}/>}></Route>
//for a private route just add element={<PrivateRoute element={<YourElement/>}/>}

function App(){
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/sign-up" element={<SignUp/>}></Route>
          <Route path="/forgot-password" element={<ForgotPasswordPage/>}></Route>
          <Route path="/reset-password/:id" element={<ResetPasswordPage/>}></Route>
          <Route path="/residents" element={<ResidentsPage/>}></Route>
          <Route path="/residents-loggedIn" element={<PrivateRoute element={ResidentsLoggedInPage}/>}></Route>
          <Route path="/about-us" element={<AboutPage/>}></Route>
          <Route path="/announcements" element={<PrivateRoute element={AnnouncementsPage}/>}></Route>
          <Route path="admin/announcements" element={<PrivateRoute element={AnnouncementsPageAdmin}/>}></Route>
          <Route path="/profile" element={<PrivateRoute element={ProfilePage}/>}></Route>
          <Route path="/payments" element={<PrivateRoute element={PaymentPage}/>}></Route>
          <Route path="/admin/payments" element={<PrivateRoute element={AdminPaymentPage}/>}></Route>
          <Route path="/admin/add-bills" element={<PrivateRoute element={AddBillPage}/>}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
