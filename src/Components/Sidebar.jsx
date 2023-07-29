import React, { useState } from "react";
import { Link } from "react-router-dom";

const tabStyle = {
  padding: "10px 20px",
  cursor: "pointer",
};

const activeTabStyle = {
  backgroundColor: "#f0f0f0",
  fontWeight: "bold",
  border: "2rem",
  borderRadius: "2rem",
};

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className="sidebar"
      style={{
        textAlign: "left",
        width: "35vh",
        height: "100vh",
        background: "#CEE6F3",
        // position: "fixed",
        // top: "0",
      }}
    >
      <div style={{ padding: "1rem", paddingTop: "2rem" }}>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <div
            style={{
              ...tabStyle,
              ...(activeTab === "home" && activeTabStyle),
            }}
            onClick={() => handleTabClick("home")}
          >
            Home
          </div>
        </Link>
        <Link to="/explore" style={{ textDecoration: "none", color: "black" }}>
          <div
            style={{
              ...tabStyle,
              ...(activeTab === "explore" && activeTabStyle),
            }}
            onClick={() => handleTabClick("explore")}
          >
            Explore
          </div>
        </Link>
        <Link
          to="/watchlater"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div
            style={{
              ...tabStyle,
              ...(activeTab === "watch_later" && activeTabStyle),
            }}
            onClick={() => handleTabClick("watch_later")}
          >
            Watch Later
          </div>
        </Link>
        <Link to="/playlist" style={{ textDecoration: "none", color: "black" }}>
          <div
            style={{
              ...tabStyle,
              ...(activeTab === "playlist" && activeTabStyle),
            }}
            onClick={() => handleTabClick("playlist")}
          >
            Playlist
          </div>
        </Link>
      </div>
    </div>
  );
}
