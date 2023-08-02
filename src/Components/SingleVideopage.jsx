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
import MoreVideo from "./MoreVideo";

export default function SingleVideoPage() {
  const [noteArray, setNoteArray] = useState([]);
  const { videoId } = useParams();

  useEffect(() => {
    localStorage.setItem("videoss", JSON.stringify(videos));

    const theVideo = JSON.parse(localStorage.getItem("videoss")).find(
      (video) => video._id === Number(videoId)
    );

    if (theVideo) {
      setNoteArray(theVideo.note);
    }
  }, [videoId]);

  const selectedVideo = videos.find((video) => video._id === Number(videoId));
  const moreVideoData = videos.filter(
    (videos) => videos._id !== selectedVideo._id
  );

  const [watchlistArray, setWatchlistArray] = useRecoilState(WatchedListAtom);
  const [watchedToggle, setWatchedToggle] = useRecoilState(
    watchedIconToggleAtom
  );
  const [modal, setModal] = useRecoilState(ModalToggle);
  const [showNotes, setShowNotes] = useState(false); // State to toggle notes visibility
  const [notes, setNotes] = useRecoilState(NotesAtomState);
  const [noteText, setNoteText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setNoteText(e.target.value);

    const updatedNote = videos.find((note) => note._id === selectedVideo._id);
    const correspondingVideo = videos.find(
      (video) => video._id === selectedVideo._id
    );

    correspondingVideo.note = [...correspondingVideo.note, noteText];

    // Update notes in state
    setNoteArray([...noteArray, noteText]);

    // Save notes to localStorage
    localStorage.setItem(
      "videoss",
      JSON.stringify(
        videos.map((video) =>
          video._id === selectedVideo._id ? correspondingVideo : video
        )
      )
    );

    handleNotesToggle();
  };

  if (!selectedVideo) {
    return <h1>Video not found</h1>;
  }

  const handleWatchlist = () => {
    setWatchedToggle(!watchedToggle);

    if (
      !watchlistArray.some((video) => video._id === selectedVideo._id) &&
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
      <div
        style={{
          display: "flex",
        }}
      >
        <section>
          <Sidebar />
        </section>
        {modal && <Modal {...selectedVideo} />}

        <section
          style={{
            background: "#FAF3F0",
            display: "flex",
            flex: 1,
            flexDirection: "column",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "25rem",
              width: "50vw",
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

          <MoreVideo data={moreVideoData} />
        </section>
        {showNotes && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Add Note</h3>

            <textarea
              style={{ border: "solid 1px ", borderRadius: "1rem" }}
              value={noteText}
              rows={4}
              cols={50}
              placeholder="Type your notes here..."
              onChange={(e) => {
                setNoteText(e.target.value);
              }}
            ></textarea>
            <button
              style={{
                padding: "1rem",
                background: "#91C8E4",
                border: "none",
              }}
              onClick={(e) => handleSubmit(e)}
            >
              submit
            </button>
          </div>
        )}

        <div
          style={{ marginLeft: "7rem", background: "#D4E2D4", width: "100%" }}
        >
          <h2 style={{}}>Added Notes</h2>

          {noteArray.length === 0 && <h4>no notes present</h4>}
          {noteArray.map((note, index) => (
            <div key={index}>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
