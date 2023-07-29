import React, { useState } from "react";
import { ModalToggle } from "../Atoms/ModalToggleAtom";
import { useRecoilState } from "recoil";
import { PlayListAtom } from "../Atoms/PlaylistAtom";

const Modal = ({ title, creator, category, thumbnail }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [addVideoChecked, setAddVideoChecked] = useState(false);

  const [modal, setModal] = useRecoilState(ModalToggle);
  const [playlistArray, setPlaylistArray] = useRecoilState(PlayListAtom);

  const handleSubmit = () => {
    if (playlistName.trim() !== "") {
      const newPlaylistItem = {
        name: playlistName,
        ...(addVideoChecked
          ? { title, creator, category, thumbnail }
          : "no entry"),
      };
      setPlaylistArray([...playlistArray, newPlaylistItem]);
    }
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
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="checkbox"
            id="addVideoChecked"
            checked={addVideoChecked}
            onChange={(e) => setAddVideoChecked(e.target.checked)}
          />
          <label htmlFor="addVideoChecked">Add this video</label>
        </div>
        <div style={{ textAlign: "center" }}>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" onClick={() => setModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
