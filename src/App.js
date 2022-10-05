import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
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
import Alerts from "./components/Alert/Alert";
import ManageLeaves from "./components/AdminFeatures/ManageLeaves";
import GenerateReport from "./components/AdminFeatures/GenerateReport";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <Router>
        <Navbar showAlert={showAlert} />
        <Alerts alert={alert} />
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route
            exact
            path="/Signup"
            element={<Signup showAlert={showAlert} />}
          />
          <Route
            exact
            path="/UserLogin"
            element={<UserLogin showAlert={showAlert} />}
          />
          <Route
            exact
            path="/AdminLogin"
            element={<AdminLogin showAlert={showAlert} />}
          />
          <Route
            exact
            path="/UserPanel"
            element={<UserPanel showAlert={showAlert} />}
          />
          <Route
            exact
            path="/AdminPanel"
            element={<AdminPanel showAlert={showAlert} />}
          />
          <Route
            exact
            path="/ManageLeaves"
            element={<ManageLeaves showAlert={showAlert} />}
          />
          <Route
            exact
            path="/AttendenceRecord"
            element={<AttendenceRecord showAlert={showAlert} />}
          />
          <Route
            exact
            path="/GenerateReport"
            element={<GenerateReport showAlert={showAlert} />}
          />

          <Route
            exact
            path="/ViewUsers"
            element={<ViewUsers showAlert={showAlert} />}
          />
          <Route
            exact
            path="/MarkAttendence"
            element={<MarkAttendence showAlert={showAlert} />}
          />
          <Route
            exact
            path="/ApplyLeave"
            element={<ApplyLeave showAlert={showAlert} />}
          />
          <Route
            exact
            path="/ViewAttendence"
            element={<ViewAttendence showAlert={showAlert} />}
          />
          <Route exact path="/About" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
