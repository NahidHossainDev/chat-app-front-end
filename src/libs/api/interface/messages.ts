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

interface Message {
	sender: Sender;
	receiver: Receiver;
	_id: string;
	text: string;
	attachment?: any;
	date_time: Date;
	createdAt: Date;
	updatedAt: Date;
	conversationId: string;
	__v: number;
}

export interface IMessages {
	messages: Message[];
	participant: Receiver;
	userId: string;
	conversationId: string;
}