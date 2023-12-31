import React, { useState } from "react";
import { ModalToggle } from "../Atoms/ModalToggleAtom";
import { useRecoilState } from "recoil";
import { PlayListAtom } from "../Atoms/PlaylistAtom";

const Modal = ({ title, creator, category, thumbnail, _id }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [modal, setModal] = useRecoilState(ModalToggle);
  const [playlistArray, setPlaylistArray] = useRecoilState(PlayListAtom);

  const handleSubmit = () => {
    const newPlaylistItem = {
      name: playlistName,
      title: title,
      creator: creator,
      category: category,
      thumbnail: thumbnail,
      id: _id,
    };
    setPlaylistArray([...playlistArray, newPlaylistItem]);
    setModal(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Add Playlist</h2>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="playlistName">Playlist Name:</label>
          <input
            type="text"
            id="playlistName"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              background: "#4caf50",
              color: "white",
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setModal(false)}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              background: "#f44336",
              color: "white",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
