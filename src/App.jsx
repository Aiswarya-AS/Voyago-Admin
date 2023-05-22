import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./components/Login/Login";
import Navbar from "./components/Home/Navbar";
import { Toaster } from "react-hot-toast";
import AddDestination from "./components/Destination/AddDestination";
import EditDestination from "./components/Destination/EditDestination";
import { AuthorizeAdmin, ProtectAdmin } from "./utilis/protected";

// import CreateDestination from './components/Destination/CreateDestination';

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Router>
        <Routes>
          {/* <ProtectAdmin> */}

          <Route path="/" element={<Login />}></Route>
          {/* </ProtectAdmin> */}
          {/* <Route element={<RequireLoginAdmin/>}> */}
            <Route
              path="/admin_home"
              element={
                <AuthorizeAdmin>
                  <Navbar />
                </AuthorizeAdmin>
              }
            ></Route>
            <Route
              path="/add_destination"
              element={
                <AuthorizeAdmin>
                  <AddDestination />
                </AuthorizeAdmin>
              }
            ></Route>
            <Route
              path="/edit_destination/:id"
              element={
                <AuthorizeAdmin>
                  <EditDestination />
                </AuthorizeAdmin>
              }
            ></Route>
          {/* </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
