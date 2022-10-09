import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@store";

const initialState: IInitialState = {
	dragCount: 0,
	showSidebar: false,
};

export const appSlice = createSlice({
	name: "appState",
	initialState,
	reducers: {
		initialDragCount(state) {
			state.dragCount = 0;
		},
		updateDragCount(state, action: PayloadAction<"INCREMENT" | "DECREMENT">) {
			if (action.payload === "INCREMENT") state.dragCount = ++state.dragCount;
			if (action.payload === "DECREMENT") state.dragCount = --state.dragCount;
		},
		updateShowSidebar(state, action) {},
	},
});

export const { updateDragCount, updateShowSidebar, initialDragCount } = appSlice.actions;
export const getAppState = (state: AppState) => state.appState;

export default appSlice.reducer;

interface IInitialState {
	dragCount: number;
	showSidebar: boolean;
}
