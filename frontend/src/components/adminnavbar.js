import React from "react";

const AdminNavbar = () => {
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
      </>
  );
};

export default AdminNavbar;
