import {RootState} from "../../store/store";

export const getPopupState = (state: RootState) => state.openPopup.isOpen;