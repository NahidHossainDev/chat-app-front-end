import { ConversationLists, MessageView } from "@components/organisms";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { Row } from "react-bootstrap";

const ENDPOINT = "localhost:5000";
// const socket = io(ENDPOINT);

export const HomePage: FC = () => {
	useEffect(() => {
		// socket.on("connect", () => {});

		return () => {
			// socket.emit("disconnect");
			// socket.off();
		};
	}, []);

	// useEffect(() => {
	//     socket.on("message", (msg) => {
	//         console.log(msg);
	//         setMessage([...message, msg]);
	//     });
	// }, [message]);

	const router = useRouter();
	return (
		<Row className='h-100vh'>
			<ConversationLists />
			<MessageView />
		</Row>
	);
};
