import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserData} from "../../../types/userType";


export interface addUserInfo {
    info: UserData;
};

const initialState: addUserInfo = {
    info: {
        created_at: "",
        current_team_id: "",
        deleted_at: "",
        egrpou: "",
        company: "",
        email: "",
        email_verified_at: "",
        firstName: "",
        guid: "",
        id: 0,
        lastName: "",
        mGuid: "",
        mMail: "",
        mName: "",
        mPhone: "",
        middleName: "",
        name: "",
        phone: "",
        profile_photo_path: "",
        profile_photo_url: "",
        role: "",
        two_factor_confirmed_at: "",
        updated_at: "",
    },
};

export const addUserInfoSlice = createSlice({
    name: 'addUserInfo',
    initialState,
    reducers: {
        addUserInfo: (state, action: PayloadAction<UserData>) => {
            state.info = action.payload
        },
        cleanUserInfo: (state) => {
            state.info = initialState.info
        }
    }
});


export const { addUserInfo, cleanUserInfo } = addUserInfoSlice.actions;

export default  addUserInfoSlice.reducer;