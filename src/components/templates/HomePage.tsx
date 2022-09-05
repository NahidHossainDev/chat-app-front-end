import { ConversationLists, MessageView } from "@components/organisms";
import { IMessages } from "@libs/api/interface/messages";
import { getConversationState, updateUnseenCount } from "@store/conversations";
import { getUserState } from "@store/user/user.slice";
import { FC, useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
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
	const dispatch = useDispatch();
	const socket = useRef<any>();

	useEffect(() => {
		socket.current = io(process.env.apiURL);
		if (user.id) {
			console.log("nahid1");
			socket.current.emit("addToActiveUsers", user.id);
			socket.current.on("getActiveUsers", (users) => {
				console.log(socket.current.id);

				console.log({ users });
				setActiveUsers(users);
			});
		}
	}, [user]);

	console.log({ currentConversaion }, { user });

	useEffect(() => {
		socket.current.on("new_message", (data: IMessages["messages"][0]) => {
			console.log({ currentConversaion });
			console.log("from-socket", data);
			if (data?.conversationId === currentConversaion?._id) {
				setMessages((prev) => [...prev, data]);
			} else {
				dispatch(updateUnseenCount(data?.conversationId, "ADD"));
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
