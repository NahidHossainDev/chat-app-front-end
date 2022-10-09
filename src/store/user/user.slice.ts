import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@store";

const initialState: IUserState = {
	id: null,
	name: null,
	mobile: null,
	email: null,
	role: null,
	isAuthenticate: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		authSignIn: (state, action: PayloadAction<IUserState>) => {
			return { ...state, ...action.payload, isAuthenticate: true };
		},

		authSignOut: (state) => {
			return { ...initialState };
		},
	},
});

export default userSlice.reducer;
export const { authSignIn, authSignOut } = userSlice.actions;
export const getUserState = (state: AppState) => state.user;

type IUserState = {
	id: string;
	name: string;
	mobile: string;
	email: string;
	role: string;
	isAuthenticate?: boolean;
};
