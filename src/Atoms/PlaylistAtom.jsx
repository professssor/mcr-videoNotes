// recoilAtoms.js

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
// Atom for the watchedList array
export const PlayListAtom = atom({
  key: "PlayListAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
