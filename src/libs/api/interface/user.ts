interface IUser {
	_id: string;
	name: string;
	mobile: string;
	avatar?: string;
}

export interface ISearchUserData {
	users: IUser[];
}

export interface ICreatorOrParticipant {
	id: string;
	name: string;
	mobile: string;
	avatar: string;
	email?: string;
}

export interface IConversationList {
	creator: ICreatorOrParticipant;
	participant: ICreatorOrParticipant;
	_id: string;
	lastUpdate: Date;
	lastSenderId?: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	unseenMsgCount: number;
}
