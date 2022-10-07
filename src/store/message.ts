import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	allConversations: null,
	currentConversaion: null,
};

export const messageSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {},
});

export default messageSlice.reducer;
