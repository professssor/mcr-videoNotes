import React, { useState } from "react";
import { Link } from "react-router-dom";
import { videos } from "../Data/videoData";
import Sidebar from "./Sidebar"; // Import your Sidebar component here

export default function ExploreComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredVideos = videos.filter((videoItem) =>
    videoItem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar component on the left */}
      <Sidebar />

      {/* Rest of the ExploreComponent on the right */}
      <div style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Explore</h2>

        {/* Input field for searching videos by title */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search videos by title"
          style={{
            padding: "0.5rem",
            marginBottom: "20px",
            width: "80%",
            fontSize: "16px",
          }}
        />

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredVideos.map((videoItem) => (
            <div
              key={videoItem._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                height: "max-content",
                padding: "1rem",
                margin: "1rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "300px", // Set a fixed width to create a grid-like layout
              }}
            >
              <Link
                to={`/category/${videoItem.category}/video/${videoItem._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <img
                  src={videoItem.thumbnail}
                  alt={`Thumbnail for ${videoItem.title}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={`https://i.pravatar.cc/40?u=${videoItem.creator}`}
                      alt={`Avatar for ${videoItem.creator}`}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                    <h5
                      style={{ margin: "0", color: "#333", fontSize: "16px" }}
                    >
                      {videoItem.title}
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
