import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import UserLogin from "./components/Login/UserLogin";
import AdminLogin from "./components/Login/AdminLogin";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import MarkAttendence from "./components/UserFeatures/MarkAttendence";
// import AdminPanel from "./components/Home/AdminPanel";
import UserPanel from "./components/Home/UserPanel";
import ViewAttendence from "./components/UserFeatures/ViewAttendence";
import ApplyLeave from "./components/UserFeatures/ApplyLeave";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/Signup"
            element={
              localStorage.getItem("roleCheck") === "null" ? <Signup /> : ""
            }
          />
          <Route
            exact
            path="/UserLogin"
            element={
              localStorage.getItem("token") ? <UserPanel /> : <UserLogin />
            }
          />
          <Route
            exact
            path="/AdminLogin"
            element={
              localStorage.getItem("roleCheck") ? <Home /> : <AdminLogin />
            }
          />
          <Route
            exact
            path="/MarkAttendence"
            element={
              localStorage.getItem("token") ? <MarkAttendence /> : <UserLogin />
            }
          />
          <Route
            exact
            path="/ApplyLeave"
            element={
              localStorage.getItem("token") ? <ApplyLeave /> : <UserLogin />
            }
          />
          <Route
            exact
            path="/ViewAttendence"
            element={
              localStorage.getItem("token") ? <ViewAttendence /> : <UserLogin />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
