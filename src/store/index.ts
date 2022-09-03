import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { reducer } from "./reducers";
const store = configureStore({
	reducer,
	devTools: process.env.nodeENV !== "production",
});

const makeStore = () => store;

export const wrapper = createWrapper<AppStore>(makeStore);
export default store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
