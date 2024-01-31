import {RootState} from "../../store/store";

export const getWalletInfo = (state: RootState) => state.addWalletInfo.info;
export const getWalletValue = (state: RootState) => state.addWalletInfo.value;
export const getWalletLashHash = (state: RootState) => state.addWalletInfo.lastHash;
