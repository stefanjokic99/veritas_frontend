import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import CaseStore from "./caseStore";


interface Store {
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  caseStore: CaseStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  caseStore: new CaseStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}