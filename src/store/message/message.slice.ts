import { IMessages, ISeen } from "@libs/api/interface/messages";
import { createEntityAdapter, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@store";

const messageAdapter = createEntityAdapter<IMessages["messages"][0]>({
	selectId: ({ _id }) => _id,
	sortComparer: (a, b) => b.createdAt.localeCompare(b.createdAt),
});

const initialState = messageAdapter.getInitialState({ unseenMsg: null, lastSeenMsgId: null });

export const messageSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
		setAllMessages: (state, action: PayloadAction<{ data: IMessages["messages"]; userId: string }>) => {
			const { data, userId } = action.payload;
			let msgIDs = []; // add to unseenMsg state if have any

			data.forEach((el) => {
				!el?.isSeen && el?.sender?.id !== userId && msgIDs.push(el._id);
			});
			if (msgIDs.length > 0) {
				state.unseenMsg = { conversationId: data[0].conversationId, msgIDs, type: "UNSEEN" };
			}
			messageAdapter.setAll(state, data);
		},

		addNewMessages: (state, action: PayloadAction<{ data: IMessages["messages"][0]; userId: string }>) => {
			const { data, userId } = action.payload;
			messageAdapter.addOne(state, data);

			if (!data.isSeen && data.sender.id !== userId) {
				state.unseenMsg = {
					conversationId: data.conversationId,
					msgIDs: [data._id],
					type: "UNSEEN",
				};
			}
		},

		clearUnseenMsgState: (state) => {
			state.unseenMsg = null;
		},

		updateMsgSeen: (state, action: PayloadAction<ISeen>) => {
			const payload = action.payload;
			payload.msgIDs.forEach((id) => {
				const m = { ...state.entities[id], isSeen: true };
				messageAdapter.upsertOne(state, m);
			});
		},

		updateLastSeenMsgId: (state, action: PayloadAction<EntityId>) => {
			state.lastSeenMsgId = action.payload;
		},
	},
});

export const {
	selectAll: selectAllMessages,
	selectById: selectMessageByID,
	selectIds: selectMessagesIDs,
	selectEntities,
} = messageAdapter.getSelectors((store: AppState) => store.messages);

export const getUnseenMessages = (state: AppState) => state.messages.unseenMsg;
export const getLastSeenMsgId = (state: AppState) => state.messages.lastSeenMsgId;

export const { setAllMessages, addNewMessages, updateMsgSeen, clearUnseenMsgState, updateLastSeenMsgId } =
	messageSlice.actions;

export default messageSlice.reducer;
