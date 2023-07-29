import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { videos } from "../Data/videoData";
import Sidebar from "./Sidebar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import NotesIcon from "@mui/icons-material/Notes";
import { useRecoilState } from "recoil";
import { WatchedListAtom } from "../Atoms/WatchedListAtom";
import { watchedIconToggleAtom } from "../Atoms/watchedIconToggleAtom";
import Modal from "./Modal";
import { ModalToggle } from "../Atoms/ModalToggleAtom";
import { NotesAtomState } from "../Atoms/NotesAtom";
export default function SingleVideoPage() {
  const { videoId } = useParams();
  const selectedVideo = videos.find((video) => video._id === Number(videoId));
  const [watchlistArray, setWatchlistArray] = useRecoilState(WatchedListAtom);
  const [watchedToggle, setWatchedToggle] = useRecoilState(
    watchedIconToggleAtom
  );
  const [modal, setModal] = useRecoilState(ModalToggle);
  const [showNotes, setShowNotes] = useState(false); // State to toggle notes visibility
  const [notes, setNotes] = useRecoilState(NotesAtomState);
  const [noteText, setNoteText] = useState("");

  const handleSubmit = (e) => {
    setNoteText(e.target.value);
    setNotes([...notes, { value: noteText }]);
    handleNotesToggle();
  };

  if (!selectedVideo) {
    return <h1>Video not found</h1>;
  }

  const handleWatchlist = () => {
    setWatchedToggle(!watchedToggle);

    if (
      !watchlistArray.some((video) => video._id == selectedVideo.id) &&
      !watchedToggle
    ) {
      // Add the video to the watchlist if it's not already in the list
      const newWatchlistArray = [...watchlistArray, selectedVideo];
      setWatchlistArray(newWatchlistArray);
    } else {
      // Remove the video from the watchlist if it's already in the list
      const filteredWatchlistArray = watchlistArray.filter(
        (video) => video._id !== selectedVideo._id
      );
      setWatchlistArray(filteredWatchlistArray);
    }
  };

  const handleNotesToggle = () => {
    setShowNotes(!showNotes);
  };

  return (
    <div style={{ width: "100vw" }}>
      <div style={{ display: "flex", width: "100vw" }}>
        <section>
          <Sidebar />
        </section>
        {modal && <Modal {...selectedVideo} />}
        <section style={{ flex: "1", padding: "20px" }}>
          <div
            style={{
              position: "relative",
              paddingBottom: "40%",
              height: "0",
              marginBottom: "20px",
            }}
          >
            <iframe
              title={selectedVideo.title}
              src={selectedVideo.src}
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          </div>
          <section
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <h1>{selectedVideo.title}</h1>
            <section>
              <AccessTimeIcon
                onClick={handleWatchlist}
                style={{
                  padding: ".5rem",
                  color: watchedToggle ? "green" : "inherit",
                }}
              />
              <PlaylistAddIcon
                style={{ padding: ".5rem" }}
                onClick={() => setModal(true)}
              />
              <NotesIcon
                style={{ padding: ".5rem", cursor: "pointer" }}
                onClick={handleNotesToggle}
              />
            </section>
          </section>
          {showNotes && (
            <div style={{ marginTop: "1rem" }}>
              <h3>Add Note</h3>

              <textarea
                value={noteText}
                rows={4}
                cols={50}
                placeholder="Type your notes here..."
                onChange={(e) => {
                  setNoteText(e.target.value);
                }}

                // Implement logic to save the notes if needed
              ></textarea>
              <button onClick={handleSubmit}>submit</button>
            </div>
          )}
        </section>
        <div style={{ width: "30rem" }}>
          <h2 style={{}}>Added Notes</h2>
          {notes.map((note) => (
            <p key={note.id} style={{ marginBottom: "0.5rem" }}>
              {note.value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
