import { NextPageContext } from "next";
import { BaseAPI } from "./baseAPI";
import { BR, IAuth, ICreateAcc } from "./interface";

class All_API extends BaseAPI {
	constructor(baseURL: string) {
		super(baseURL);
	}

	/**
	 * User Sign in
	 * @param username
	 * @param password
	 * @returns
	 */

	authSignin = (username: string, password: string) => this.post<BR<IAuth>>("login", { username, password });

	/**
	 * Check if user is authenticate
	 * @param ctx
	 * @returns
	 */
	validateAuth = (ctx: NextPageContext) => this.get<BR<IAuth>>("validate-auth", ctx);

	authRegister = (payload: object) => this.post<BR<ICreateAcc>>("users/create-account", payload);
}

export const all_API = new All_API(process.env.apiURL);
