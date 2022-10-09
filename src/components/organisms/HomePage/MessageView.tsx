import { all_API } from "@libs/api/allApi";
import { getConversationState } from "@store/conversations.slice";
import { selectMessagesIDs, setAllMessages } from "@store/message.slice";
import { getUserState } from "@store/user/user.slice";
import { FC, useEffect, useRef } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ComposeBox } from "./ComposeBox";
import { ConversationHeader } from "./ConversationHeader";
import SingleText from "./SingleText";

export const MessageView: FC<PropsType> = ({ backArrow }) => {
	const user = useSelector(getUserState);
	const { currentConversation } = useSelector(getConversationState);
	const messageIDs = useSelector(selectMessagesIDs);

	const lastMsg = useRef(null);
	const dispatch = useDispatch();

	const getMessage = async () => {
		if (currentConversation?._id) {
			try {
				const { success, data, message } = await all_API.getMessages(currentConversation?._id);
				if (success) {
					dispatch(setAllMessages(data?.messages));
				}
			} catch (err) {}
		}
	};

	// const updateSeenUnSeen = async (data, type: "UNSEEN" | "SEEN") => {
	// 	const payload = { ...data, type };
	// 	try {
	// 		const { success, data, message } = await all_API.updateSeenUnseen(payload);
	// 		if (success) {
	// 			setMessages((prevSt) => {
	// 				let arr = prevSt;
	// 				data.msgIDs.forEach((element) => {
	// 					arr.forEach((el, i) => {
	// 						if (element === el._id) arr[i].isSeen = true;
	// 					});
	// 				});
	// 				return arr;
	// 			});
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	useEffect(() => {
		getMessage();
	}, [currentConversation]);

	// useEffect(() => {
	// 	const unSeenIDs = [];
	// 	messages?.filter((el) => {
	// 		const me = el.sender?.id === user?.id;
	// 		if (el.isSeen === false && !me) unSeenIDs.push(el._id.toString());
	// 	});
	// 	if (unSeenIDs.length > 0) {
	// 		const payload = {
	// 			conversationId: currentConversation?._id,
	// 			msgIDs: unSeenIDs,
	// 		};
	// 		updateSeenUnSeen(payload, "SEEN");
	// 	}
	// 	if (lastMsg) scrollToBottom(lastMsg.current);
	// }, [messages.length]);

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
					<div className='Text_Container VerticalScroller' onClick={(e) => e.preventDefault()}>
						<div className='w-100 '>
							{messageIDs?.length > 0
								? messageIDs.map((el, i) => {
										return (
											<SingleText
												key={i}
												messageId={el}
												nextMsgId={messageIDs[i + 1]}
												lastMsg={lastMsg}
											/>
										);
								  })
								: null}
						</div>
					</div>

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
