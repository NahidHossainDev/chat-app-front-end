import Icon, { attachment, planeSend } from "@libs/icons";
import { FC, useState } from "react";
import styled from "styled-components";

export const ComposeBox: FC<PropsType> = ({ sendMessage }) => {
	const [text, setText] = useState<string>("");

	const handlerCallSendMessage = async () => {
		if (text) {
			const success = await sendMessage(text);
			if (success) setText("");
		}
	};
	return (
		<Wrapper>
			<div role='button' className='d-flex align-items-center'>
				<Icon path={attachment} />
			</div>
			<textarea
				rows={1}
				placeholder='Enter your message'
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						handlerCallSendMessage();
					}
				}}
			/>
			<div role='button' className='d-flex align-items-center' onClick={handlerCallSendMessage}>
				<Icon path={planeSend} />
			</div>
		</Wrapper>
	);
};

interface PropsType {
	sendMessage: (e: string) => Promise<boolean>;
}

const Wrapper = styled.footer`
	background-color: #30434e;
	padding: 20px;
	display: grid;
	grid-template-columns: 1.5rem auto 1.5rem;
	grid-column-gap: 1rem;

	textarea {
		background-color: #2a3942;
		border: none;
		padding: 10px 20px;
		border-radius: 10px;
		min-width: 50%;
		color: white;
	}
`;
