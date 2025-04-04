import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import "./App.css";
import "./register.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Sauce Boss</Link>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/home" className="nav-link">Home</Link>
            <button className="nav-button logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="nav-button" onClick={() => navigate("/login")}>Login</button>
            <button className="nav-button" onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("username"));

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
};

export default App;
