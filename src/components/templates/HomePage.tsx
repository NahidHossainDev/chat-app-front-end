import { ConversationLists, MessageView } from "@components/organisms";
import { FC, useState } from "react";
import { Row } from "react-bootstrap";
// import { io } from "socket.io-client";

// const ENDPOINT = "localhost:5000";
// const socket = io(ENDPOINT);

export const HomePage: FC = () => {
	const [selectedConversation, setSelectedConversation] = useState<string>(null);
	const [messages, setMessages] = useState<any>([]);
	// useEffect(() => {
	// 	// socket.on("connect", () => {});

	// 	return () => {
	// 		// socket.emit("disconnect");
	// 		// socket.off();
	// 	};
	// }, []);

	// handle new/live incoming message from socket
	// useEffect(() => {
	// 	socket.on("new_message", (msg) => {
	// 		console.log(msg);
	// 		setMessages([...messages, msg]);
	// 	});
	// }, []);

	return (
		<Row className='h-100vh'>
			<ConversationLists />
			<MessageView selectedConversation={selectedConversation} />
		</Row>
	);
};
