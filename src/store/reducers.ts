import appState from "./app/app.slice";
import conversations from "./conversations.slice";
import messages from "./message/message.slice";
import user from "./user/user.slice";

export const reducer = {
	appState,
	conversations,
	user,
	messages,
};
