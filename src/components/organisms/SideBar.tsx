import { IMessages } from "@libs/api/interface/messages";
import { getAppState, updateShowSidebar } from "@store/app/app.slice";
import { updateCurrentConversation } from "@store/conversations.slice";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { MessageView } from "./HomePage";

const SideBar: FC<PropsType> = ({ messages, setMessages, ...rest }) => {
	const router = useRouter();
	const { showSidebar } = useSelector(getAppState);
	const dispatch = useDispatch();

	useEffect(() => {
		router.beforePopState(({ as }) => {
			if (as !== router.asPath) {
				dispatch(updateShowSidebar(false));
				dispatch(updateCurrentConversation(null));
			}
			return false;
		});
	}, [router]);
	return (
		<OffCanvasWrapper show={showSidebar} placement={"end"} backdrop={false}>
			<MessageView backArrow messages={messages} setMessages={setMessages} />
		</OffCanvasWrapper>
	);
};

export default SideBar;

interface PropsType {
	messages: IMessages["messages"];
	setMessages: Dispatch<SetStateAction<IMessages["messages"]>>;
}

const OffCanvasWrapper = styled(Offcanvas)`
	width: 100%;
`;
