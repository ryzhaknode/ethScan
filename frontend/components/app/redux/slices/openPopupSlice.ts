import {createSlice} from "@reduxjs/toolkit";


export interface openPoppupState {
    isOpen: boolean;
};

const initialState: openPoppupState = {
    isOpen: false
};

export const openPopupSlice = createSlice({
    name: 'openPopup',
    initialState,
    reducers: {
        showPopup: (state) => {
            state.isOpen = true;
        },
        hidePopup: (state) => {
            state.isOpen = false;
        }
    }
});


export const {showPopup, hidePopup} = openPopupSlice.actions;

export default openPopupSlice.reducer;