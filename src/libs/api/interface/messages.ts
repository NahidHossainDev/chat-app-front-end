interface Sender {
	id: string;
	name: string;
	avatar?: any;
}

interface Receiver {
	id: string;
	name: string;
	avatar?: any;
}

export interface FileState {
	fileName: string;
	gDriveID: string;
}
interface Message {
	sender: Sender;
	receiver: Receiver;
	_id: string;
	text: string;
	attachment?: FileState[];
	date_time: string;
	createdAt: string;
	updatedAt: string;
	conversationId: string;
	isSeen: boolean;
	__v: number;
}

export interface IMessages {
	messages: Message[];
	participant: Receiver;
	userId: string;
	conversationId: string;
}

export interface ISeen {
	conversationId: string;
	msgIDs: string[];
	type: "UNSEEN" | "SEEN";
}

export interface IFileUpload {
	filename: string;
	id: string;
}
