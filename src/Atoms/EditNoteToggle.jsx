// recoilAtoms.js

import { atom } from "recoil";

// Atom for the watchedList array
export const EditNoteToggleAtom = atom({
  key: "EditNoteToggleAtom",
  default: false,
});
