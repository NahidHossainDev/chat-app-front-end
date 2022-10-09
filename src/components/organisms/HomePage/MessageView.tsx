import { FileItem } from "@components/molecules";
import { all_API } from "@libs/api/allApi";
import { IMessages } from "@libs/api/interface/messages";
import { getConversationState } from "@store/conversations.slice";
import { getUserState } from "@store/user/user.slice";
import { scrollToBottom } from "@utils/helpers";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ComposeBox } from "./ComposeBox";
import { ConversationHeader } from "./ConversationHeader";

export const MessageView: FC<PropsType> = ({ messages, setMessages, backArrow }) => {
	const user = useSelector(getUserState);
	const { currentConversation } = useSelector(getConversationState);
	const lastMsg = useRef(null);

	const getMessage = async () => {
		if (currentConversation?._id) {
			try {
				const { success, data, message } = await all_API.getMessages(currentConversation?._id);
				if (success) {
					setMessages(data?.messages);
				}
			} catch (err) {}
		}
	};

	const updateSeenUnSeen = async (data, type: "UNSEEN" | "SEEN") => {
		const payload = { ...data, type };
		try {
			const { success, data, message } = await all_API.updateSeenUnseen(payload);
			if (success) {
				setMessages((prevSt) => {
					let arr = prevSt;
					data.msgIDs.forEach((element) => {
						arr.forEach((el, i) => {
							if (element === el._id) arr[i].isSeen = true;
						});
					});
					return arr;
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getMessage();
	}, [currentConversation]);

	useEffect(() => {
		const unSeenIDs = [];
		messages?.filter((el) => {
			const me = el.sender?.id === user?.id;
			if (el.isSeen === false && !me) unSeenIDs.push(el._id.toString());
		});
		if (unSeenIDs.length > 0) {
			const payload = {
				conversationId: currentConversation?._id,
				msgIDs: unSeenIDs,
			};
			updateSeenUnSeen(payload, "SEEN");
		}
		if (lastMsg) scrollToBottom(lastMsg.current);
	}, [messages.length]);

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
							{messages?.length > 0
								? messages.map((el, i) => {
										const me = el.sender?.id === user?.id;
										let seen = false;
										if (me && el?.isSeen) {
											if (messages[i + 1]) {
												if (messages[i + 1].sender.id === user?.id && !messages[i + 1].isSeen)
													seen = true;
											} else {
												seen = true;
											}
										}

										return (
											<Text key={i} className={`${me ? "text-end" : ""}`}>
												<span
													className={` text-viwer ${
														me ? "me" : "oponent"
													}-text position-relative `}
												>
													<div id={`triangle-top-${me ? "right" : "left"}`}></div>
													{el.text}
													<div>
														{el.attachment?.map((el) => (
															<FileItem isMessageView {...el} key={el.gDriveID} />
														))}
													</div>
												</span>
												{seen && <div className='text-success'>(seen)</div>}
												<div ref={lastMsg} />
											</Text>
										);
								  })
								: null}
						</div>
					</div>

					<ComposeBox setMessages={setMessages} />
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
	messages: IMessages["messages"];
	setMessages: Dispatch<SetStateAction<IMessages["messages"]>>;
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
			.text-viwer {
				display: inline-block;
				margin-top: 0.8rem;
			}
		}
	}
`;

const Text = styled.div`
	.me-text {
		padding: 6px 10px;
		border-radius: 7px;
		border-top-right-radius: 0;
		background-color: #039474;
		position: relative;
		max-width: 70%;
	}
	#triangle-top-right {
		width: 0;
		height: 0;
		display: inline;
		border-top: 11px solid #039474;
		border-right: 10px solid transparent;
		position: absolute;
		right: -7px;
		top: 0;
	}

	.oponent-text {
		padding: 6px 10px;
		border-radius: 7px;
		background-color: #395566;
		border-top-left-radius: 0;
		max-width: 70%;
	}

	#triangle-top-left {
		width: 0;
		height: 0;
		display: inline;
		border-top: 11px solid #394e5a;
		border-left: 10px solid transparent;
		position: absolute;
		left: -7px;
		top: 0;
	}
`;
