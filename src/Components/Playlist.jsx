import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { PlayListAtom } from "../Atoms/PlaylistAtom";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const Playlist = () => {
  const [playlistArray, setPlaylistArray] = useRecoilState(PlayListAtom);

  const handleDelete = (videoItem) => {
    const newArray = playlistArray.filter(
      (playlist) => playlist.name !== videoItem.name
    );
    setPlaylistArray(newArray);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Sidebar />
      </div>
      <div style={{ flex: 3 }}>
        <div>
          <h2>Playlist</h2>
          {playlistArray.length === 0 ? (
            <h1 style={{ margin: "auto" }}>no Playlist added</h1>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap", // Set flex-wrap to wrap items
              }}
            >
              {playlistArray.map((videoItem, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    overflow: "hidden",
                    height: "max-content",
                    padding: "1rem",
                    margin: "1rem",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: "300px",
                  }}
                >
                  {videoItem.thumbnail && (
                    <img
                      src={videoItem.thumbnail}
                      alt={`Thumbnail for ${videoItem.name}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <div>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <h5
                        style={{
                          margin: "auto",
                          color: "#333",
                          fontSize: "16px",
                        }}
                      >
                        {videoItem.name}
                      </h5>
                      <p>my personal recommendations</p>
                    </div>
                    <p onClick={() => handleDelete(videoItem)}>❌ </p>
                  </div>
                </div>
              ))}

              <h2>add more playlist </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
