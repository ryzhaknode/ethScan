import {configureStore} from "@reduxjs/toolkit";
import addWalletInfoReducer from '../slices/addWalletSlice'
import openPopupReducer from '../slices/openPopupSlice'

export const store = configureStore(({
    reducer: {
        addWalletInfo: addWalletInfoReducer,
        openPopup: openPopupReducer,
    },
}))


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch