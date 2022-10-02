import { FileState } from "@components/organisms/HomePage/ComposeBox";
import { all_API } from "@libs/api/allApi";
import Icon, { closeCircleFill } from "@libs/icons";
import { fileNameShortener } from "@utils/helpers";
import { Dispatch, FC, SetStateAction } from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

export const FileItem: FC<PropsType> = ({ file, id, gDriveID, setFiles }) => {
	const handleDeleteFile = async () => {
		if (gDriveID) {
			const { success } = await all_API.deleteFile(gDriveID);
			if (success) setFiles((prevStat) => prevStat.filter((el) => el.id !== id));
		}
	};

	return (
		<Wrapper>
			<label>{fileNameShortener(file.name, 12)}</label>
			{gDriveID ? (
				<span role='button' className='cross-icon' onClick={handleDeleteFile}>
					<Icon path={closeCircleFill} width={20} height={20} />
				</span>
			) : (
				<Spinner animation='border' />
			)}
		</Wrapper>
	);
};

interface PropsType extends FileState {
	setFiles: Dispatch<SetStateAction<FileState[]>>;
}

const Wrapper = styled.div`
	padding: 0.3rem 0.2rem 0rem 0.3rem;
	margin-right: 0.3rem;
	margin-top: 0.3rem;
	font-size: 0.825rem;
	border: 1px solid gray;
	border-radius: 0.3rem;
	display: inline-block;
	background-color: gray;
	position: relative;
	label {
		width: 125px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cross-icon {
		position: absolute;
		top: 0;
		right: 0;
	}
	.spinner-border {
		height: 1rem;
		width: 1rem;
	}
`;
