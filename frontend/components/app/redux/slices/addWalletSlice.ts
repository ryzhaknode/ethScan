import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserData} from "../../../types/userType";


export interface addWalletInfo {
    info: string | null;
    value: number | null;
    lastHash: string | null;
};

const initialState: addWalletInfo = {
    info: null,
    value: null,
    lastHash: null
};

export const addWalletInfoSlice = createSlice({
    name: 'addWalletInfo',
    initialState,
    reducers: {
        addWalletInfo: (state, action: PayloadAction<string | null>) => {
            state.info = action.payload
        },
        addWalletValue: (state, action: PayloadAction<number | null>) => {
            state.value = action.payload
        },
        addWalletLastHash: (state, action: PayloadAction<string | null>) => {
            state.lastHash = action.payload
        },

        cleanUserInfo: (state) => {
            state.info = initialState.info;
            state.value = initialState.value;
            state.lastHash = initialState.lastHash;
        }
    }
});


export const { addWalletInfo, cleanUserInfo, addWalletValue, addWalletLastHash } = addWalletInfoSlice.actions;

export default  addWalletInfoSlice.reducer;