/*import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
    initialState: {
        user: {
            id: null,
            username: "",
            email: "",
            password: "",
            token: "",
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
})

export default userSlice.reducer;*/
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            id: null,
            username: "",
            email: "",
            password: "",
            isVerified: false,
            hasTakenQuiz: false,
            level: "",
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
