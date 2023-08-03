import React, { useEffect } from "react";
import { EditNoteToggleAtom } from "../Atoms/EditNoteToggle";
import { useRecoilState } from "recoil";
import { EditNoteText } from "../Atoms/EditNoteText";
import { NoteFunctionAtom } from "../Atoms/NoteFunctionAtom";

const EditNoteModal = ({ text }) => {
  const [noteModalToggle, setNoteModalToggle] =
    useRecoilState(EditNoteToggleAtom);
  const [noteText, setNoteText] = useRecoilState(EditNoteText);
  const [noteFunction, setNoteFunction] = useRecoilState(NoteFunctionAtom);
  const modalStyles = {
    position: "fixed",
    zIndex: "1000000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  };

  const inputStyles = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const handleNoteChange = (e) => {
    setNoteText(e.target.value);

    setNoteFunction(true);
  };

  // Update the note text in the input field when 'text' prop changes
  useEffect(() => {
    setNoteText(text);
  }, [text]);
  const handlenoteChange = () => {
    setNoteModalToggle(false);
  };

  return (
    <div style={modalStyles}>
      <h5>Edit Note</h5>
      <input
        placeholder="Enter your note here..."
        value={noteText}
        onChange={handleNoteChange}
        type="text"
        style={inputStyles}
      />
      <button onClick={handlenoteChange}>Edit</button>
      <button onClick={() => setNoteModalToggle(false)}>Close</button>
    </div>
  );
};

export default EditNoteModal;
