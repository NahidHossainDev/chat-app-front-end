import { IMessages } from "@libs/api/interface/messages";
import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@store";

const messageAdapter = createEntityAdapter<IMessages["messages"][0]>({
	selectId: ({ _id }) => _id,
	sortComparer: (a, b) => b.createdAt.localeCompare(b.createdAt),
});

const initialState = messageAdapter.getInitialState();

export const messageSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
		setAllMessages: (state, action: PayloadAction<IMessages["messages"]>) => {
			messageAdapter.upsertMany(state, action.payload);
		},
		addNewMessages: (state, action: PayloadAction<IMessages["messages"][0]>) => {
			messageAdapter.addOne(state, action.payload);
		},
	},
});

export const {
	selectAll: selectAllMessages,
	selectById: selectMessageByID,
	selectIds: selectMessagesIDs,
	selectEntities,
} = messageAdapter.getSelectors((store: AppState) => store.messages);

export const { setAllMessages, addNewMessages } = messageSlice.actions;

export default messageSlice.reducer;
