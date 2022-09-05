interface IUser {
	_id: string;
	name: string;
	mobile: string;
	avatar?: string;
}

export interface ISearchUserData {
	users: IUser[];
}

interface ICreatorOrParticipant {
	id: string;
	name: string;
	mobile: string;
	avatar: string;
}

export interface IConversationList {
	creator: ICreatorOrParticipant;
	participant: ICreatorOrParticipant;
	_id: string;
	lastUpdate: Date;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	unseenMsgCount: number;
}
