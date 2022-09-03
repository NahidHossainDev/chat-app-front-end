import { ConversationLists, MessageView } from "@components/organisms";
import { IMessages } from "@libs/api/interface/messages";
import { IConversationList } from "@libs/api/interface/user";
import { getUserState } from "@store/user/user.slice";
import { FC, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
// import { io } from "socket.io-client";

// const ENDPOINT = "localhost:5000";
// const socket = io(ENDPOINT);

export const HomePage: FC = () => {
	const [activeConv, setActiveConv] = useState<IConversationList>(null);
	const [messages, setMessages] = useState<IMessages["messages"]>([]);
	const [activeUsers, setActiveUsers] = useState<IActiveUsers[]>([]);
	const user = useSelector(getUserState);

	const socket = io("http://localhost:5000/");

	useEffect(() => {
		if (user.id) {
			socket.emit("addToActiveUsers", user.id);

			socket.on("new_message", (data: IMessages["messages"][0]) => {
				console.log("from-socket", { activeConv }, data);
				if (data?.conversationId === activeConv?._id) {
					setMessages((prev) => [...prev, data]);
				}
			});
		}
	}, [user.id]);

	useEffect(() => {
		socket.on("getActiveUsers", (users) => {
			setActiveUsers(users);
		});
	}, []);

	return (
		<Row className='h-100vh'>
			<ConversationLists setActiveConv={setActiveConv} activeConv={activeConv} activeUsers={activeUsers} />
			<MessageView activeConv={activeConv} messages={messages} setMessages={setMessages} />
		</Row>
	);
};

export interface IActiveUsers {
	userId: string;
	socketId: string;
}
