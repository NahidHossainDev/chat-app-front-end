import { ConversationLists, MessageView } from "@components/organisms";
import SideBar from "@components/organisms/SideBar";
import { IMessages, ISeen } from "@libs/api/interface/messages";
import { useWindowSize } from "@libs/hooks/useWindowSize";
import { setDragCountHandler } from "@store/app/app.action";
import { clearDragCount, getAppState, updateIsMobile } from "@store/app/app.slice";
import { newMessagesAction } from "@store/message/message.action";
import { updateLastSeenMsgId, updateMsgSeen } from "@store/message/message.slice";
import { getUserState } from "@store/user/user.slice";
import { FC, useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

export const HomePage: FC = () => {
	const [activeUsers, setActiveUsers] = useState<IActiveUsers[]>([]);
	const user = useSelector(getUserState);
	const { isMobile } = useSelector(getAppState);
	const dispatch = useDispatch();
	const socket = useRef<any>();

	const isMobileView = useWindowSize().width < 525.9;
	useEffect(() => {
		dispatch(updateIsMobile(isMobileView));
	}, [isMobileView]);

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
			newMessagesAction(data, user, dispatch);
		});
	}, [socket, user?.id]);

	useEffect(() => {
		socket.current.on("msg_seen", (data: ISeen) => {
			if (data) {
				dispatch(updateMsgSeen(data));
				if (data.type === "SEEN") dispatch(updateLastSeenMsgId(data?.msgIDs[data?.msgIDs.length - 1]));
			}
		});
	}, [socket, user?.id]);

	return (
		<Row
			onDragEnter={setDragCountHandler}
			onDragOver={setDragCountHandler}
			onDragLeave={setDragCountHandler}
			onDragEnd={setDragCountHandler}
			onDrop={() => dispatch(clearDragCount())}
		>
			<ConversationLists isMobileView={isMobile} activeUsers={activeUsers} />
			{isMobile ? <SideBar /> : <MessageView />}
		</Row>
	);
};

export interface IActiveUsers {
	userId: string;
	socketId: string;
}
