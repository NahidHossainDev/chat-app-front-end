import { ConversationLists, MessageView } from "@components/organisms";
import { IMessages } from "@libs/api/interface/messages";
import { getConversationState } from "@store/conversations";
import { getUserState } from "@store/user/user.slice";
import { FC, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
// import { io } from "socket.io-client";

// const ENDPOINT = "localhost:5000";
// const socket = io(ENDPOINT);

export const HomePage: FC = () => {
	// const [currentConversaion, setActiveConv] = useState<IConversationList>(null);
	const [messages, setMessages] = useState<IMessages["messages"]>([]);
	const [activeUsers, setActiveUsers] = useState<IActiveUsers[]>([]);
	const user = useSelector(getUserState);
	const { currentConversaion } = useSelector(getConversationState);

	const socket = io(process.env.apiURL);
	useEffect(() => {
		if (user.id) {
			console.log("nahid1");
			socket.emit("addToActiveUsers", user.id);
		}
	}, [user]);

	useEffect(() => {
		socket.on("getActiveUsers", (users) => {
			console.log("nahid2");
			setActiveUsers(users);
		});
	}, []);

	console.log({ currentConversaion }, { user });

	useEffect(() => {
		socket.on("new_message", (data: IMessages["messages"][0]) => {
			console.log("nahid3");
			console.log({ currentConversaion });
			console.log("from-socket", data);
			if (data?.conversationId === currentConversaion?._id) {
				setMessages((prev) => [...prev, data]);
			}
		});
	}, []);

	return (
		<Row className='h-100vh'>
			<ConversationLists activeUsers={activeUsers} />
			<MessageView activeConv={currentConversaion} messages={messages} setMessages={setMessages} />
		</Row>
	);
};

export interface IActiveUsers {
	userId: string;
	socketId: string;
}
