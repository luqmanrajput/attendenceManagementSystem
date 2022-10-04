import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import UserLogin from "./components/Login/UserLogin";
import AdminLogin from "./components/Login/AdminLogin";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import MarkAttendence from "./components/UserFeatures/MarkAttendence";
import UserPanel from "./components/Home/UserPanel";
import ViewAttendence from "./components/UserFeatures/ViewAttendence";
import ApplyLeave from "./components/UserFeatures/ApplyLeave";
import AdminPanel from "./components/Home/AdminPanel";
import ViewUsers from "./components/AdminFeatures/ViewUsers";
import About from "./components/About/About";
import AttendenceRecord from "./components/AdminFeatures/AttendenceRecord";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/UserLogin" element={<UserLogin />} />
          <Route exact path="/AdminLogin" element={<AdminLogin />} />
          <Route exact path="/UserPanel" element={<UserPanel />} />
          <Route exact path="/AdminPanel" element={<AdminPanel />} />
          <Route
            exact
            path="/AttendenceRecord"
            element={<AttendenceRecord />}
          />

          <Route exact path="/ViewUsers" element={<ViewUsers />} />
          <Route exact path="/MarkAttendence" element={<MarkAttendence />} />
          <Route exact path="/ApplyLeave" element={<ApplyLeave />} />
          <Route exact path="/ViewAttendence" element={<ViewAttendence />} />
          <Route exact path="/About" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
