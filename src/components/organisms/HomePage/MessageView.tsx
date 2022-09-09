import { all_API } from "@libs/api/allApi";
import { IMessages } from "@libs/api/interface/messages";
import { IConversationList } from "@libs/api/interface/user";
import { getUserState } from "@store/user/user.slice";
import { scrollToBottom } from "@utils/helpers";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ComposeBox } from "./ComposeBox";
import { ConversationHeader } from "./ConversationHeader";

export const MessageView: FC<PropsType> = ({ activeConv, messages, setMessages }) => {
	// const [lastSeenIndex, setLastSeenIndex] = useState<number>(null);
	const user = useSelector(getUserState);
	const lastMsg = useRef(null);

	const sendMessage = async (text: string) => {
		if (text) {
			const reciver = activeConv?.creator?.id === user?.id ? activeConv.participant : activeConv?.creator;
			const payload = {
				conversationId: activeConv?._id,
				message: text,
				receiverId: reciver?.id,
				receiverName: reciver?.name,
				avatar: reciver?.avatar,
			};
			try {
				const { success, data, message } = await all_API.sendMessage(payload);
				if (success) {
					setMessages((prev) => [...prev, data]);
					return true;
				}
			} catch (err) {
				return false;
			}
		}
	};

	const getMessage = async () => {
		if (activeConv?._id) {
			try {
				const { success, data, message } = await all_API.getMessages(activeConv?._id);
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
				console.log({ data });
			} else {
				console.log({ data });
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getMessage();
	}, [activeConv]);

	useEffect(() => {
		const unSeenIDs = messages?.filter((el) => {
			const me = el.sender?.id === user?.id;
			if (el.isSeen === false && !me) return el._id.toString();
		});

		if (unSeenIDs.length > 0) {
			const payload = {
				conversationId: activeConv?._id,
				msgIDs: unSeenIDs,
			};
			updateSeenUnSeen(payload, "SEEN");
		}
		if (lastMsg) scrollToBottom(lastMsg.current);
	}, [messages]);

	return (
		<Wrapper xs={9}>
			{activeConv ? (
				<div className='RightSide'>
					<ConversationHeader
						name={
							activeConv?.creator.id === user.id ? activeConv?.participant.name : activeConv?.creator.name
						}
						mobile={
							activeConv?.creator.id === user.id
								? activeConv?.participant.mobile
								: activeConv?.creator.mobile
						}
					/>
					<div className='Text_Container VerticalScroller'>
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
												<span className={`${me ? "me" : "oponent"}-text position-relative `}>
													<div id={`triangle-top-${me ? "right" : "left"}`}></div>
													{el.text}
												</span>
												{seen && <div className='text-success'>(seen)</div>}
												<div ref={lastMsg} />
											</Text>
										);
								  })
								: null}
						</div>
					</div>
					<ComposeBox sendMessage={sendMessage} />
				</div>
			) : (
				<div className='d-flex h-100'>
					<p className='m-auto'> Open an conversation to start</p>
				</div>
			)}
		</Wrapper>
	);
};

interface PropsType {
	activeConv: IConversationList;
	messages: IMessages["messages"];
	setMessages: Dispatch<SetStateAction<IMessages["messages"]>>;
}

const Wrapper = styled(Col)`
	color: white;
	background-color: #243038;

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
			padding: 0 3rem;
			margin-bottom: 0.6rem;
			span {
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
