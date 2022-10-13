import { all_API } from "@libs/api/allApi";
import { getConversationState } from "@store/conversations.slice";
import { setAllMessages } from "@store/message/message.slice";
import { getUserState } from "@store/user/user.slice";
import { FC, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ComposeBox } from "./ComposeBox";
import { ConversationHeader } from "./ConversationHeader";
import { TextContainer } from "./TextContainer";

export const MessageView: FC<PropsType> = ({ backArrow }) => {
	const user = useSelector(getUserState);
	const { currentConversation } = useSelector(getConversationState);
	const dispatch = useDispatch();

	const getMessage = async () => {
		if (currentConversation?._id) {
			try {
				const { success, data, message } = await all_API.getMessages(currentConversation?._id);
				if (success) {
					const payload = { data: data?.messages, userId: user?.id };
					dispatch(setAllMessages(payload));
				}
			} catch (err) {}
		}
	};

	useEffect(() => {
		getMessage();
	}, [currentConversation]);

	return (
		<Wrapper>
			{currentConversation ? (
				<div className='RightSide'>
					<ConversationHeader
						backArrow={backArrow}
						name={
							currentConversation?.creator.id === user.id
								? currentConversation?.participant.name
								: currentConversation?.creator.name
						}
						mobile={
							currentConversation?.creator.id === user.id
								? currentConversation?.participant.mobile
								: currentConversation?.creator.mobile
						}
					/>
					<TextContainer />
					<ComposeBox />
				</div>
			) : (
				<div className='d-flex h-100'>
					<h4 className='m-auto text-secondary'> Open a conversation to start</h4>
				</div>
			)}
		</Wrapper>
	);
};

interface PropsType {
	backArrow?: boolean;
}

const Wrapper = styled(Col)`
	color: white;
	background-color: #243038;
	position: relative;

	.RightSide {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		max-height: 100vh;

		.VerticalScroller {
			height: 100%;
			overflow-y: auto;
		}
		.Text_Container {
			width: 100%;
			padding: 0 1rem;
			margin-bottom: 0.6rem;
		}
	}
`;
