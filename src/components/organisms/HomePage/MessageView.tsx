import { FC, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";

export const MessageView: FC<PropsType> = ({ selectedConversation }) => {
	const [text, setText] = useState<string>("");
	const [message, setMessage] = useState<Object[]>([]);
	const sendMessage = (msg: string) => {
		// socket.emit("send_message", text, () => setText(""));
		setText("");
	};

	const getMessage = async () => {};

	useEffect(() => {
		getMessage();
	}, [selectedConversation]);

	return (
		<Wrapper xs={9}>
			<div className='Text_Container'>
				<div className='w-100'>
					<div className='me'>
						<span className='me-text position-relative'>
							<div id='triangle-top-right'></div>Hi this is me!
						</span>
					</div>
					<div className='oponent'>
						<span className='oponent-text position-relative'>
							<div id='triangle-top-left'></div>
							Hi this is me! <br />
							adfadfa <br /> adfadf <br /> adfad
							<br /> adfadf <br />
							dfadfa
						</span>
					</div>
				</div>
			</div>
			<footer>
				<input
					type='text'
					placeholder='Enter your message'
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={(e) => {
						e.key === "Enter" ? sendMessage(text) : null;
					}}
				/>
			</footer>
		</Wrapper>
	);
};

interface PropsType {
	selectedConversation: string;
}

const Wrapper = styled(Col)`
	color: white;
	.Text_Container {
		height: calc(100vh - 85px);
		display: flex;
		width: 100%;
		align-items: flex-end;
		padding: 0 3rem;
		background-color: #243038;
		.oponent {
			.oponent-text {
				padding: 6px 10px;
				border-radius: 10px;
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
		}
		.me {
			text-align: end;

			.me-text {
				padding: 10px;
				border-radius: 10px;
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
		}
		span {
			display: inline-block;
			margin: 0.6rem 0;
		}
	}

	footer {
		background-color: #30434e;
		padding: 20px;
		width: 100%;

		input {
			background-color: #2a3942;
			border: none;
			padding: 10px 20px;
			border-radius: 10px;
			min-width: 50%;
			color: white;
		}
	}
`;
