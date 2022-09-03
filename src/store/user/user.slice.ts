import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserState = {
	id: null,
	name: null,
	mobile: null,
	email: null,
	role: null,
	isAuthenticate: false,
	isMobile: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		authSignIn: (state, action: PayloadAction<IUserState>) => {
			return { ...state, ...action.payload, isAuthenticate: true };
		},

		updateIsMobile: (state, action: PayloadAction<boolean>) => {
			state.isMobile = action.payload;
		},

		authSignOut: (state) => {
			return { ...initialState };
		},
	},
});

export default userSlice.reducer;
export const { authSignIn, authSignOut, updateIsMobile } = userSlice.actions;
export const getUserState = (state) => state.user;

type IUserState = {
	id: string;
	name: string;
	mobile: string;
	email: string;
	role: string;
	isAuthenticate?: boolean;
	isMobile?: boolean;
};
