import store from "@store";
import { DragEvent } from "react";
import { updateDragCount } from "./app.slice";

export const setDragCountHandler = (e: DragEvent<HTMLElement>) => {
	e.preventDefault();
	e.stopPropagation();

	const {
		conversations: { currentConversation },
	} = store.getState();

	if (e.type === "dragenter") {
		!!currentConversation && store.dispatch(updateDragCount("INCREMENT"));
	} else if (e.type === "dragleave" || e.type === "dragend") {
		!!currentConversation && store.dispatch(updateDragCount("DECREMENT"));
	}
};
