import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { PlayListAtom } from "../Atoms/PlaylistAtom";
import Sidebar from "./Sidebar";
import { Link, NavLink, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { ModalToggle } from "../Atoms/ModalToggleAtom";
import Modal from "./Modal";

const Playlist = () => {
  const [playlistArray, setPlaylistArray] = useRecoilState(PlayListAtom);
  const [modal, setModal] = useRecoilState(ModalToggle);
  const handleDelete = (videoItem) => {
    const newArray = playlistArray.filter(
      (playlist) => playlist.name !== videoItem.name
    );
    setPlaylistArray(newArray);
  };
  console.log(playlistArray);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Sidebar />
      </div>
      <div style={{ flex: 3 }}>
        <div>
          {modal && <Modal />}
          <h2>Playlist</h2>
          {playlistArray.length === 0 ? (
            <h2 onClick={() => setModal(true)} style={{ margin: "auto" }}>
              ➕add more playlist
            </h2>
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
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={
                      videoItem.category
                        ? `/category/${videoItem.category}/video/${videoItem.id}`
                        : `/noplaylist`
                    }
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
                    </div>
                  </Link>

                  <p onClick={() => handleDelete(videoItem)}>Remove❌</p>
                </div>
              ))}

              <h2 onClick={() => setModal(true)} style={{ margin: "auto" }}>
                ➕add more playlist
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
