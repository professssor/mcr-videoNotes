// recoilAtoms.js

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
// Atom for the watchedList array
export const watchedIconToggleAtom = atom({
  key: "watchedIconToggleAtom",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
