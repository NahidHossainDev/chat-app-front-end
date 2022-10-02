import { ConversationLists, MessageView } from "@components/organisms";
import SideBar from "@components/organisms/SideBar";
import { all_API } from "@libs/api/allApi";
import { IMessages, ISeen } from "@libs/api/interface/messages";
import { useWindowSize } from "@libs/hooks/useWindowSize";
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
	const [seenData, setSeenData] = useState<ISeen>(null);
	const [showSideBar, setShowSidebar] = useState<boolean>(true);
	const [dragActive, setDragActive] = useState<boolean>(false);
	const user = useSelector(getUserState);
	const { currentConversaion } = useSelector(getConversationState);
	const dispatch = useDispatch();
	const socket = useRef<any>();

	const dragParams = { dragActive, setDragActive };

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
		socket.current.on("msg_seen", (data: ISeen) => {
			setSeenData(data);
		});
	}, [socket, user?.id]);

	useEffect(() => {
		if (seenData) {
			setMessages((prevSt) => {
				let arr = [...prevSt];
				seenData.msgIDs.forEach((element) => {
					arr.forEach((el, i) => {
						if (element === el._id) arr[i].isSeen = true;
					});
				});
				return arr;
			});
		}
	}, [seenData]);

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
			} else {
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const isMobileView = useWindowSize().width < 525.9;

	const handleDrag = function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			console.log("nahid-3");
			currentConversaion && setDragActive(true);
		} else if (e.type === "dragleave") {
			console.log("nahid-4");
			setDragActive(false);
		}
	};

	console.log(dragActive);

	return (
		<Row
			className='h-100vh'
			onDragEnter={handleDrag}
			onDragLeave={handleDrag}
			onDragOver={handleDrag}
			// onDragEnd={handleDrag}
		>
			{isMobileView ? (
				currentConversaion ? (
					<SideBar
						show={showSideBar}
						setShow={setShowSidebar}
						messages={messages}
						setMessages={setMessages}
					/>
				) : (
					<ConversationLists isMobileView activeUsers={activeUsers} />
				)
			) : (
				<>
					<ConversationLists activeUsers={activeUsers} />
					<MessageView messages={messages} setMessages={setMessages} {...dragParams} />
				</>
			)}
		</Row>
	);
};

export interface IActiveUsers {
	userId: string;
	socketId: string;
}
