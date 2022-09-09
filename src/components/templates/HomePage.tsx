import { ConversationLists, MessageView } from "@components/organisms";
import { all_API } from "@libs/api/allApi";
import { IMessages } from "@libs/api/interface/messages";
import { getConversationState, updateUnseenCount } from "@store/conversations";
import { getUserState } from "@store/user/user.slice";
import { FC, useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
export const HomePage: FC = () => {
	const [messages, setMessages] = useState<IMessages["messages"]>([]);
	const [activeUsers, setActiveUsers] = useState<IActiveUsers[]>([]);
	const [newMsg, setNewMsg] = useState<IMessages["messages"][0]>(null);
	const user = useSelector(getUserState);
	const { currentConversaion } = useSelector(getConversationState);
	const dispatch = useDispatch();
	const socket = useRef<any>();

	useEffect(() => {
		socket.current = io(process.env.apiURL);
		if (user.id) {
			socket.current.emit("addToActiveUsers", user.id);
			socket.current.on("getActiveUsers", (users) => {
				setActiveUsers(users);
			});
		}
	}, [user]);

	useEffect(() => {
		socket.current.on("new_message", (data: IMessages["messages"][0]) => {
			setNewMsg(data);
		});
	}, [socket, user?.id]);

	useEffect(() => {
		if (newMsg) {
			if (newMsg?.conversationId === currentConversaion?._id) {
				setMessages((prev) => [...prev, newMsg]);
			} else {
				const payload = {
					conversationId: newMsg?.conversationId,
					msgIDs: [],
				};
				updateSeenUnSeen(payload, "UNSEEN");
			}
		}
	}, [newMsg]);

	const updateSeenUnSeen = async (data, type: "UNSEEN" | "SEEN") => {
		const payload = { ...data, type };
		try {
			const { success, data, message } = await all_API.updateSeenUnseen(payload);
			if (success) {
				dispatch(updateUnseenCount(newMsg?.conversationId, "ADD"));
				console.log({ data });
			} else {
				console.log({ data });
			}
		} catch (error) {
			console.log(error);
		}
	};

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
