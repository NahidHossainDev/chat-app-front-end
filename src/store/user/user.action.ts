import { IAuth } from "@pages/api/interface";
import store from "@store";
import { destroyCookie, setCookie } from "nookies";
import { authSignIn, authSignOut } from "./user.slice";

export const setAuthUser = async (data: IAuth): Promise<void> => {
	const { token, ...rest } = data;
	setCookie(null, "token", token, {
		maxAge: 2 * 24 * 60 * 60,
		path: "/",
		// sameSite: 'Strict',
		// secure: process.env.nodeEnv === 'production',
	});
	store.dispatch(authSignIn({ ...rest }));
};

/**
 * Revoke app user access
 */
export const revokeAuthUser = (): Promise<void> => {
	return new Promise((resolve) => {
		destroyCookie(null, "token");
		store.dispatch(authSignOut());
		resolve();
	});
};
