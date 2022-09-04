import { all_API } from "@libs/api/allApi";
import { IMessages } from "@libs/api/interface/messages";
import { IConversationList } from "@libs/api/interface/user";
import { getUserState } from "@store/user/user.slice";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ComposeBox } from "./ComposeBox";
import { ConversationHeader } from "./ConversationHeader";

export const MessageView: FC<PropsType> = ({ activeConv, messages, setMessages }) => {
	const [count, setCount] = useState(0);
	const user = useSelector(getUserState);

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
					setCount((prev) => prev + 1);
					setMessages((prev) => [...prev, data]);
					console.log(count, "api response");
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

	useEffect(() => {
		getMessage();
	}, [activeConv]);

	return (
		<Wrapper xs={9}>
			{activeConv ? (
				<>
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
					<div className='Text_Container'>
						<div className='w-100 VerticalScroller'>
							{messages?.length > 0
								? messages.map((el, i) => {
										const me = el.sender?.id === user?.id;
										return (
											<Text key={i} className={`${me ? "text-end" : ""}`}>
												<span className={`${me ? "me" : "oponent"}-text position-relative `}>
													<div id={`triangle-top-${me ? "right" : "left"}`}></div>
													{el.text}
												</span>
											</Text>
										);
								  })
								: null}
						</div>
					</div>
					<ComposeBox sendMessage={sendMessage} />
				</>
			) : (
				<div className='d-flex align-item-center justify-content-center h-100'>
					<p>Open an conversation to start</p>
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
	.Text_Container {
		height: calc(100vh - 85px);
		display: flex;
		width: 100%;
		align-items: flex-end;
		padding: 0 3rem;
		span {
			display: inline-block;
			margin: 0.6rem 0;
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
