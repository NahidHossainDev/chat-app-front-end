import { FileItem } from "@components/molecules";
import { all_API } from "@libs/api/allApi";
import { IMessages } from "@libs/api/interface/messages";
import Icon, { attachment as attachIcon, planeSend } from "@libs/icons";
import { getConversationState } from "@store/conversations";
import { getUserState } from "@store/user/user.slice";
import { ChangeEvent, Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { DragDropFile } from "./DragDropFile";

export const ComposeBox: FC<PropsType> = ({ setMessages, ...rest }) => {
	const [text, setText] = useState<string>("");
	const [attachment, setAttachment] = useState<FileState[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const fileInput = useRef<HTMLInputElement>();

	const user = useSelector(getUserState);
	const { currentConversaion } = useSelector(getConversationState);

	const sendMessage = async () => {
		if (text || (attachment[0].gDriveID && !loading)) {
			const reciver =
				currentConversaion?.creator?.id === user?.id
					? currentConversaion.participant
					: currentConversaion?.creator;
			const payload = {
				conversationId: currentConversaion?._id,
				message: text,
				receiverId: reciver?.id,
				receiverName: reciver?.name,
				avatar: reciver?.avatar,
				attachment,
			};
			try {
				setLoading(true);
				const { success, data, message } = await all_API.sendMessage(payload);
				if (success) {
					setMessages((prev) => [...prev, data]);
					setText("");
				}
			} catch (err) {
				return false;
			} finally {
				setLoading(false);
			}
		}
	};

	const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		if (files[0]) {
			const formData = new FormData();
			Array.from(files).forEach((el, i) => {
				formData.append("file", files[i]);
				setAttachment((prevState) => [...prevState, { fileName: files[i].name, gDriveID: "" }]);
			});

			try {
				setLoading(true);
				const { success, data, message } = await all_API.uploadFile(formData);
				if (success) {
					setAttachment((prevState) => {
						let newArr = [...prevState];
						data.forEach((el) => {
							newArr = newArr.map((n) => (el.filename === n.fileName ? { ...n, gDriveID: el.id } : n));
						});
						return newArr;
					});
				} else {
					message && toast.error(message);
					// remove from state
					Array.from(files).forEach((e, i) => {
						setAttachment((prevStat) => prevStat.filter((el) => e.name !== el.fileName));
					});
				}
			} catch (error) {
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<>
			<Wrapper>
				<div role='button' className='d-flex align-items-center justify-content-center'>
					<Icon path={attachIcon} role='button' onClick={() => fileInput.current.click()} />
				</div>
				<div className='text-box'>
					<input
						multiple
						hidden
						max={2}
						type='file'
						onChange={handleFileUpload}
						onClick={(e) => ((e.target as HTMLInputElement).value = null)}
						ref={fileInput}
					/>
					<div>
						{attachment?.map((el) => (
							<FileItem
								{...el}
								key={el.gDriveID}
								setFiles={setAttachment}
								loading={loading}
								setLoading={setLoading}
							/>
						))}
					</div>
					<textarea
						rows={1}
						placeholder='Enter your message'
						value={text}
						onChange={(e) => setText(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								sendMessage();
							}
						}}
					/>
				</div>
				<div role='button' className='d-flex align-items-center justify-content-center' onClick={sendMessage}>
					<Icon path={planeSend} />
				</div>
			</Wrapper>
			<DragDropFile handleOnChange={handleFileUpload} {...rest} />
		</>
	);
};

interface PropsType {
	// sendMessage: (e: string) => Promise<boolean>;
	dragActive: number;
	setDragActive: Dispatch<SetStateAction<number>>;
	handleDrag: (e: any) => void;
	setMessages: Dispatch<SetStateAction<IMessages["messages"]>>;
}

export interface FileState {
	fileName: string;
	gDriveID: string;
}
const Wrapper = styled.footer`
	background-color: #30434e;
	padding: 0.7rem;
	display: grid;
	grid-template-columns: 1.5rem auto 1.5rem;
	grid-column-gap: 1rem;

	.text-box {
		min-width: 50%;
		color: white;
		background-color: #2a3942;
		border-radius: 0.4rem;
		padding: 0.5rem 0.7rem;
		padding-bottom: 0rem;
		textarea {
			border: none;
			outline: none;
			color: white;
			width: 100%;
			padding: 0.4rem 0;
			background-color: transparent;
		}
	}
`;
