import React from "react";
import { Link } from "react-router-dom";
import { FaHome,FaBook, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";

const Navbar = () => {
  return (
    <>
      <nav
        style={{
          display: "flex",
          position: "sticky",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          background: "#004080", 
          color: "white",
          top: 0,
          zIndex: 99,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <img
          src="/nsm-logo.jpeg"
          alt="Logo 1"
          style={{ height: "50px", marginRight: "10px" }}
        />
        <div style={{ textAlign: "center" }}>
          <h1 style={{ margin: "0", fontSize: "20px" }}>
            NSM Center for Training in HPC
          </h1>
          <h2 style={{ margin: "0", fontSize: "16px" }}>
            Walchand College of Engineering, Sangli
          </h2>
        </div>
        <img
          src="/wce-logo.jpeg"
          alt="Logo 2"
          style={{ height: "50px", marginLeft: "10px" }}
        />
      </nav>


      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#e0e0e0",
          color: "#004080",
          padding: "10px 0",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontWeight: "500",
        }}
      >
        <Link
          to="/"
          style={{
            margin: "0 20px",
            textDecoration: "none",
            color: "#004080",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaHome style={{ marginRight: "8px" }} />
          Home
        </Link>
       
        <a
          href="/#resources"
          style={{
            margin: "0 20px",
            textDecoration: "none",
            color: "#004080",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaBook style={{ marginRight: "8px" }} /> Resources
        </a>

      
        <Link
          to="/events"
          style={{
            margin: "0 20px",
            textDecoration: "none",
            color: "#004080",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaCalendarAlt style={{ marginRight: "8px" }} />
          Events
        </Link>

        <Link
          to="/contact"
          style={{
            margin: "0 20px",
            textDecoration: "none",
            color: "#004080",
            display: "flex",
            alignItems: "center",
          }}
        >
          <MdOutlineContactMail style={{marginRight:"8px"}}/> Contact Us
        </Link>
      </div>
    </>
  );
};

export default Navbar;
