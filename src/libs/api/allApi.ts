import { NextPageContext } from "next";
import { BaseAPI } from "./baseAPI";
import { BR, IAuth, ICreateAcc } from "./interface";
import { IFileUpload, IMessages, ISeen } from "./interface/messages";
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

	authRegister = (payload: FormData) => this.formData<BR<ICreateAcc>>("users/create-account", payload);

	searchUser = (payload: object) => this.post<BR<ISearchUserData>>("users/searchUser", payload);

	addNewConversation = (payload: object) => this.post<BR<IConversationList>>("inbox/addConversation", payload);

	getAllConversation = (ctx: NextPageContext) => this.get<BR<IConversationList[]>>("inbox/getConversationLists", ctx);

	getMessages = (id: string) => this.get<BR<IMessages>>(`inbox/messages/${id}`);

	sendMessage = (payload: object) => this.post<BR<IMessages["messages"][0]>>("inbox/sendMessage", payload);

	updateSeenUnseen = (payload: ISeen) => this.post<BR<ISeen>>("inbox/updateSeenUnseen", payload);

	uploadFile = (payload: FormData) => this.formData<BR<IFileUpload[]>>("inbox/uploadFile", payload);

	deleteFile = (id: string) => this.delete<BR<string>>(`inbox/deleteFile/${id}`, {});
}

export const all_API = new All_API(process.env.apiURL);
