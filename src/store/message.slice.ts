import { IMessages } from "@libs/api/interface/messages";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const messageAdapter = createEntityAdapter<IMessages["messages"]>();

const initialState = messageAdapter.getInitialState();

export const messageSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {},
});

export default messageSlice.reducer;
