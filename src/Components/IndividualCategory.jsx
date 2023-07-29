import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { videos } from "../Data/videoData";
import Sidebar from "./Sidebar";

export default function IndividualCategory() {
  const { categoryName } = useParams();
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const videoList = videos.filter((video) => video.category === categoryName);
    setVideo(videoList);
  }, [categoryName]);

  return (
    <div style={{ display: "flex", width: "100vw" }}>
      <section>
        <Sidebar />
      </section>

      <section
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "15px",
            padding: "2rem",
            width: "100%",
          }}
        >
          {video.length === 0 ? (
            <h1>No videos available for this category</h1>
          ) : (
            video.map((videoItem) => (
              <div
                key={videoItem._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  overflow: "hidden",
                  height: "fit-content",
                  marginTop: "2rem",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`video/${videoItem._id}`}
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
                        }}
                      />
                      <h5
                        style={{ margin: "0", color: "#333", fontSize: "16px" }}
                      >
                        {videoItem.title}
                      </h5>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ marginBottom: "5px", fontSize: "14px" }}>
                        Views: {videoItem.views}
                      </p>
                      <p style={{ marginBottom: "5px", fontSize: "14px" }}>
                        Creator: {videoItem.creator}
                      </p>
                      <p style={{ fontSize: "14px" }}>
                        Chips: {videoItem.chips.join(", ")}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
