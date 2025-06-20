import React from "react";
import Navbar from "./Navbar";
import "./Home.css";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h2>Welcome to the Book Management System 📚</h2>
        <p>You can Login or Register to manage your books.</p>
      </div>
    </div>
  );
}

export default Home;
