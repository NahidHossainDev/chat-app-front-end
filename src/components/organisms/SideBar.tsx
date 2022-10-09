import { IMessages } from "@libs/api/interface/messages";
import { updateCurrentConversation } from "@store/conversations";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { MessageView } from "./HomePage";

const SideBar: FC<PropsType> = ({ show, setShow, messages, setMessages, ...rest }) => {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		router.beforePopState(({ as }) => {
			if (as !== router.asPath) {
				setShow(false);
				dispatch(updateCurrentConversation(null));
			}
			return false;
		});
	}, [router]);
	return (
		<OffCanvasWrapper show={show} placement={"end"} backdrop={false}>
			<MessageView {...rest} messages={messages} setMessages={setMessages} />
		</OffCanvasWrapper>
	);
};

export default SideBar;

interface PropsType {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
	messages: IMessages["messages"];
	setMessages: Dispatch<SetStateAction<IMessages["messages"]>>;
	handleDrag: (e) => void;
}

const OffCanvasWrapper = styled(Offcanvas)`
	width: 100%;
`;
