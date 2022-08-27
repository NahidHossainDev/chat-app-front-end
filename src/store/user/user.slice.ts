import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserState = {
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
			console.log(action.payload);

			state = { ...action.payload, isAuthenticate: true };
		},

		authSignOut: (state) => {
			state = initialState;
		},
	},
});

export default userSlice.reducer;
export const { authSignIn, authSignOut } = userSlice.actions;
export const getUserState = (state) => state.user;

type IUserState = {
	name: string;
	mobile: string;
	email: string;
	role: string;
	isAuthenticate?: boolean;
	isMobile?: boolean;
};
