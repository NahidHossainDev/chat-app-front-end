import { IMessages } from "@libs/api/interface/messages";
import { updateCurrentConversation } from "@store/conversations";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { MessageView } from "./HomePage";

const SideBar: FC<PropsType> = ({ show, setShow, messages, setMessages }) => {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		router.beforePopState(({ as }) => {
			console.log("adsfadf");

			if (as !== router.asPath) {
				// Will run when leaving the current page; on back/forward actions
				// Add your logic here, like toggling the modal state
				setShow(false);
				dispatch(updateCurrentConversation(null));
			}
			return false;
		});

		// return () => {
		// 	router.beforePopState(() => true);
		// };
	}, [router]);
	return (
		<OffCanvasWrapper show={show} placement={"end"} backdrop={false}>
			<MessageView messages={messages} setMessages={setMessages} />
		</OffCanvasWrapper>
	);
};

export default SideBar;

interface PropsType {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
	messages: IMessages["messages"];
	setMessages: Dispatch<SetStateAction<IMessages["messages"]>>;
}

const OffCanvasWrapper = styled(Offcanvas)`
	width: 100%;
`;
