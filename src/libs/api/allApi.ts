import { NextPageContext } from "next";
import { BaseAPI } from "./baseAPI";
import { BR, IAuth, ICreateAcc } from "./interface";
import { IMessages } from "./interface/messages";
import { IConversationList, ISearchUserData } from "./interface/user";

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

	searchUser = (payload: object) => this.post<BR<ISearchUserData>>("users/searchUser", payload);

	addNewConversation = (payload: object) => this.post<BR<IConversationList>>("inbox/addConversation", payload);

	getAllConversation = () => this.get<BR<IConversationList[]>>("inbox/getConversationLists");

	getMessages = (id: string) => this.get<BR<IMessages>>(`inbox/messages/${id}`);

	sendMessage = (payload: object) => this.post<BR<IMessages["messages"][0]>>("inbox/sendMessage", payload);
}

export const all_API = new All_API(process.env.apiURL);
