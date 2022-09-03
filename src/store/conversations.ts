import { IConversationList } from "@libs/api/interface/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@store";

const initialState: IConversationState = {
	allConversations: null,
	currentConversaion: null,
};

export const conversationSlice = createSlice({
	name: "conversations",
	initialState,
	reducers: {
		updateAllConversation: (state, action: PayloadAction<IConversationList[]>) => {
			return { ...state, allConversations: action.payload };
		},

		updateCurrentConversation: (state, action: PayloadAction<IConversationList>) => {
			return { ...state, currentConversaion: action.payload };
		},
	},
});

export default conversationSlice.reducer;
export const { updateCurrentConversation, updateAllConversation } = conversationSlice.actions;
export const getConversationState = (state: AppState) => state.conversations;

type IConversationState = {
	allConversations: IConversationList[];
	currentConversaion: IConversationList;
};
