import {RootState} from "../../store/store";

export const getUserInfo = (state: RootState) => state.addUserInfo.info;