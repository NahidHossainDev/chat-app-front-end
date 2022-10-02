import { FileItem } from "@components/molecules";
import { all_API } from "@libs/api/allApi";
import Icon, { attachment, planeSend } from "@libs/icons";
import { ChangeEvent, FC, useRef, useState } from "react";
import styled from "styled-components";

export const ComposeBox: FC<PropsType> = ({ sendMessage }) => {
	const [text, setText] = useState<string>("");
	const [fileArr, setFiles] = useState<FileState[]>([]);
	const fileInput = useRef<HTMLInputElement>();

	const handlerCallSendMessage = async () => {
		if (text) {
			const success = await sendMessage(text);
			if (success) setText("");
		}
	};

	const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;

		if (files[0]) {
			const formData = new FormData();
			Array.from(files).forEach((el, i) => {
				formData.append("file", files[i]);
				setFiles((prevState) => [...prevState, { file: files[i], id: ++fileArr.length, gDriveID: "" }]);
			});

			const { success, data } = await all_API.uploadFile(formData);
			console.log(data);

			if (success) {
				setFiles((prevState) => {
					let newArr = [...prevState];
					data.forEach((el) => {
						newArr = newArr.map((n) => (el.filename === n.file.name ? { ...n, gDriveID: el.id } : n));
					});
					return newArr;
				});
			}
		}
	};

	console.log(fileArr);

	return (
		<Wrapper>
			<div role='button' className='d-flex align-items-center justify-content-center'>
				<Icon path={attachment} role='button' onClick={() => fileInput.current.click()} />
			</div>
			<div className='text-box'>
				<input
					multiple
					hidden
					type='file'
					onChange={handleOnChange}
					onClick={(e) => ((e.target as HTMLInputElement).value = null)}
					ref={fileInput}
				/>
				<div>
					{fileArr?.map((el) => (
						<FileItem key={el.id} {...el} setFiles={setFiles} />
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
							handlerCallSendMessage();
						}
					}}
				/>
			</div>
			<div
				role='button'
				className='d-flex align-items-center justify-content-center'
				onClick={handlerCallSendMessage}
			>
				<Icon path={planeSend} />
			</div>
		</Wrapper>
	);
};

interface PropsType {
	sendMessage: (e: string) => Promise<boolean>;
}

export interface FileState {
	file: any;
	id: number;
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
