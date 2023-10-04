import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./utils/protectedRoute";
import useCookieAuth from "./utils/decodeCookie";
import Profile from "./pages/profile";
import decodeCookie from "./utils/decodeCookie";
import { LOGOUT_URL } from "./config";
import axios from "axios";
global.Buffer = Buffer;


function App() {
  const [authenticated, setAuthenticated] = useState(!!decodeCookie())
  function handleLogout() {
    axios.get(LOGOUT_URL, { withCredentials: true }).then(res => {
      console.log(res.data)
      setAuthenticated(false)

    }).catch(err => console.log(err))
  }
  useEffect(() => {
    const decodedToken = decodeCookie();
    if (decodedToken) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>


          <Route
            path="/login"
            element={
              authenticated ? (
                <Navigate to="/" />
              ) : (
                <Login setAuthenticated={setAuthenticated} />
              )
            }
          />
          <Route
            path="/"
            element={
              authenticated ? (
                <Home handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              authenticated ? (
                <Dashboard handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              authenticated ? (
                <Profile handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App
