// recoilAtoms.js

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
// Atom for the watchedList array
export const ModalToggle = atom({
  key: "ModalToggle",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
