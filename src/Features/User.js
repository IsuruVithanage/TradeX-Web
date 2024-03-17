import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
    initialState: {
        user: {
            id: 1,
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

export default userSlice.reducer;