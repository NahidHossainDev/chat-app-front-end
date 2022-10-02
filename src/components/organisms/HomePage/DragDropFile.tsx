import { getConversationState } from "@store/conversations";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

export const DragDropFile: FC<PropsType> = ({ dragActive, setDragActive }) => {
	// drag state

	// ref
	const inputRef = useRef(null);

	// handle drag events

	// triggers when file is dropped
	const handleDrop = function (e) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		const { files } = e.dataTransfer;
		if (files && files[0]) {
			// handleFiles(e.dataTransfer.files);
			console.log(files[0]);
		}
	};

	// triggers when file is selected with click
	const handleChange = function (e) {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			// handleFiles(e.target.files);
		}
	};

	// triggers the input when the button is clicked
	const onButtonClick = () => {
		inputRef.current.click();
	};
	const { currentConversaion } = useSelector(getConversationState);

	const handleDrag = function (e) {
		e.preventDefault();
		// e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			console.log("nahid-1");

			currentConversaion && setDragActive(true);
		} else if (e.type === "dragleave") {
			console.log("nahid-2");

			setDragActive(false);
		}
	};

	return (
		<FromWrapper
			dragStart={dragActive}
			id='form-file-upload'
			onDragEnter={handleDrag}
			onSubmit={(e) => e.preventDefault()}
		>
			<input ref={inputRef} type='file' id='input-file-upload' multiple={true} onChange={handleChange} />
			<label id='label-file-upload' htmlFor='input-file-upload' className={dragActive ? "drag-active" : ""}>
				<div>
					<p>Drag and drop your file here or</p>
					<button className='upload-button' onClick={onButtonClick}>
						Upload a file
					</button>
				</div>
			</label>
			{dragActive && (
				<div
					id='drag-file-element'
					// onDragEnter={handleDrag}
					// onDragLeave={handleDrag}
					// onDragOver={handleDrag}
					// onDrop={handleDrop}
				></div>
			)}
		</FromWrapper>
	);
};

interface PropsType {
	dragActive: boolean;
	setDragActive: Dispatch<SetStateAction<boolean>>;
}

const FromWrapper = styled.form<{ dragStart: boolean }>`
	height: 0;
	width: 100%;
	max-width: 100%;
	text-align: center;
	position: absolute;
	bottom: 0;

	/* ${({ dragStart }) =>
		dragStart &&
		css`
			height: 100vh;
			transition: 0.3s;
		`} */

	#input-file-upload {
		display: none;
	}

	#label-file-upload {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-width: 2px;
		border-style: dashed;
		border-color: #cbd5e1;
		background-color: #f8fafc;
	}

	#label-file-upload.drag-active {
		background-color: #ffffff;
	}

	.upload-button {
		cursor: pointer;
		padding: 0.25rem;
		font-size: 1rem;
		border: none;
		font-family: "Oswald", sans-serif;
		background-color: transparent;
	}

	.upload-button:hover {
		text-decoration-line: underline;
	}

	#drag-file-element {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 1rem;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
	}
`;
