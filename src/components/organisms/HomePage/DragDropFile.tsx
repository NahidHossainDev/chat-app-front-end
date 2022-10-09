import { setDragCountHandler } from "@store/app/app.action";
import { clearDragCount, getAppState } from "@store/app/app.slice";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

export const DragDropFile: FC<PropsType> = ({ handleOnChange }) => {
	const { dragCount } = useSelector(getAppState);

	const dispatch = useDispatch();

	const handleDrop = function (e) {
		e.preventDefault();
		e.stopPropagation();
		dispatch(clearDragCount());

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
			dragStart={dragCount > 0}
			id='form-file-upload'
			onDragEnter={setDragCountHandler}
			onDragOver={setDragCountHandler}
			onDrop={handleDrop}
		>
			{dragCount > 0 && <h4 className='text-secondary'>Drop your file here...</h4>}
		</FromWrapper>
	);
};

interface PropsType {
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
