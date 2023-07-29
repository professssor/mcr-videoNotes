import React from "react";
import { useRecoilState } from "recoil";
import { WatchedListAtom } from "../Atoms/WatchedListAtom";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import your Sidebar component here
import { watchedIconToggleAtom } from "../Atoms/watchedIconToggleAtom";

export default function WatchLaterComp() {
  const [watchlistArray, setWatchlistArray] = useRecoilState(WatchedListAtom);
  const [watchedToggle, setWatchedToggle] = useRecoilState(
    watchedIconToggleAtom
  );

  // Check if the watchlist is empty and display a message

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar component */}
      <Sidebar />

      <div
        style={{ flex: 1, padding: "1rem", display: "flex", flexWrap: "wrap" }}
      >
        <h1 style={{ flex: "100%", textAlign: "center" }}>Watch Later</h1>

        {watchlistArray.length === 0 ? (
          <h1 style={{ margin: "auto" }}>no videos added</h1>
        ) : (
          watchlistArray.map((videoItem) => (
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
              {/* <h3 onClick={() => setWatchedToggle(false)}>
                remove from watchlist
              </h3> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
