import { Dispatch, FC, SetStateAction } from "react";
import styled, { css } from "styled-components";

export const DragDropFile: FC<PropsType> = ({ dragActive, setDragActive, handleDrag, handleOnChange }) => {
	const handleDrop = function (e) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(0);

		const { files: f } = e.dataTransfer;
		if (f && f[0]) {
			const e = {
				target: {
					files: f,
				},
			};
			handleOnChange(e);
		}
	};

	return (
		<FromWrapper
			dragStart={dragActive > 0}
			id='form-file-upload'
			onDragEnter={handleDrag}
			onDragOver={handleDrag}
			onDrop={handleDrop}
		>
			{dragActive > 0 && <h4 className='text-secondary'>Drop your file here...</h4>}
		</FromWrapper>
	);
};

interface PropsType {
	dragActive: number;
	setDragActive: Dispatch<SetStateAction<number>>;
	handleDrag: (e) => void;
	handleOnChange: (e) => Promise<void>;
}

const FromWrapper = styled.div<{ dragStart: boolean }>`
	height: 0;
	display: none;
	width: calc(100% - 15px);
	max-width: 100%;
	text-align: center;
	position: absolute;
	bottom: 0;
	background-color: #26363f;
	display: flex;
	align-items: center;
	justify-content: center;

	${({ dragStart }) =>
		dragStart &&
		css`
			height: 100vh;
			border: 2px dashed #cbd5e1;
			transition: 0.4s;
		`}
`;
