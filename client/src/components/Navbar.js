import React from "react";
import { Link } from "react-router-dom";
import '../App.css'
import { FaHome } from "react-icons/fa";

const Navbar = () =>{
    return(
        <div className="navbar">
          <div className="logo">Object_Detector</div>
          <Link to="/"><FaHome className="home-icon"/></Link>
        </div>
    )
}

export default Navbar;