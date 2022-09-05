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
		updateUnseenCount: {
			prepare(convId: string, type: "ADD" | "REMOVE") {
				return { payload: { convId, type } };
			},
			reducer(state, action: PayloadAction<IUpdateUnseenPayload>) {
				const { convId, type } = action.payload;
				// adding or removing unseenMsgCount by TYPE
				const newConvArr = state.allConversations.map(
					(el) => el._id === convId && { ...el, unseenMsgCount: type === "ADD" ? el.unseenMsgCount + 1 : 0 }
				);
				return { ...state, allConversations: newConvArr };
			},
		},
	},
});

export default conversationSlice.reducer;
export const { updateCurrentConversation, updateAllConversation, updateUnseenCount } = conversationSlice.actions;
export const getConversationState = (state: AppState) => state.conversations;

type IConversationState = {
	allConversations: IConversationList[];
	currentConversaion: IConversationList;
};
type IUpdateUnseenPayload = {
	convId: string;
	type: "ADD" | "REMOVE";
};
