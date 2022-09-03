import { ConversationLists, MessageView } from "@components/organisms";
import { IMessages } from "@libs/api/interface/messages";
import { IConversationList } from "@libs/api/interface/user";
import { FC, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { io } from "socket.io-client";
// import { io } from "socket.io-client";

// const ENDPOINT = "localhost:5000";
// const socket = io(ENDPOINT);

export const HomePage: FC = () => {
	const [activeConv, setActiveConv] = useState<IConversationList>(null);
	const [messages, setMessages] = useState<IMessages["messages"]>([]);

	const socket = io("http://localhost:5000/");

	console.log({ activeConv });
	useEffect(() => {
		socket.on("new_message", (data: IMessages["messages"][0]) => {
			console.log("from-socket", { activeConv }, data);
			if (data?.conversationId === activeConv?._id) {
				setMessages((prev) => [...prev, data]);
			}
		});
	}, []);

	return (
		<Row className='h-100vh'>
			<ConversationLists setActiveConv={setActiveConv} activeConv={activeConv} />
			<MessageView activeConv={activeConv} messages={messages} setMessages={setMessages} />
		</Row>
	);
};
