// recoilAtoms.js

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
// Atom for the watchedList array
export const NotesAtomState = atom({
  key: "NotesAtomState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
