import { all_API } from "@libs/api/allApi";
import { IMessages, ISeen } from "@libs/api/interface";
import store from "@store";
import { updateUnseenCount } from "@store/conversations.slice";
import { IUserState } from "@store/user/user.slice";
import { Dispatch } from "redux";
import { addNewMessages, updateMsgSeen } from "./message.slice";

export const updateSeenUnSeen = async (payload: ISeen, type: "UNSEEN" | "SEEN", dispatch: Dispatch) => {
	const p = { ...payload, type };
	try {
		const { success, data, message } = await all_API.updateSeenUnseen(p);
		if (success) {
			if (type === "SEEN") dispatch(updateMsgSeen(data));
			else dispatch(updateUnseenCount(data?.conversationId, "ADD"));
		}
	} catch (error) {
		console.log(error);
	}
};

export const newMessagesAction = (data: IMessages["messages"][0], user: IUserState, dispatch: Dispatch) => {
	const {
		conversations: { currentConversation },
	} = store.getState();

	if (data) {
		if (data?.conversationId === currentConversation?._id) {
			const payload = { data: data, userId: user?.id };
			dispatch(addNewMessages(payload));
		} else {
			const payload: ISeen = {
				conversationId: data.conversationId,
				msgIDs: [],
				type: "UNSEEN",
			};
			updateSeenUnSeen(payload, "UNSEEN", dispatch);
		}
	}
};

// const updateSeenUnSeen = async (data, type: "UNSEEN" | "SEEN") => {
//     const payload = { ...data, type };
//     try {
//         const { success, data, message } = await all_API.updateSeenUnseen(payload);
//         if (success) {
//             type === "UNSEEN" && dispatch(updateUnseenCount(newMsg?.conversationId, "ADD"));
//         } else {
//             console.log(data);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };
