import { all_API } from "@libs/api/allApi";
import { FileState } from "@libs/api/interface/messages";
import Icon, { closeCircleFill, downloadCloud } from "@libs/icons";
import { fileNameShortener } from "@utils/helpers";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";

export const FileItem: FC<PropsType> = ({ fileName, gDriveID, setFiles, loading, setLoading, isMessageView }) => {
	const handleDeleteFile = async () => {
		setLoading(true);
		if (gDriveID) {
			try {
				const { success, message } = await all_API.deleteFile(gDriveID);
				if (success) {
					setFiles((prevStat) => prevStat.filter((el) => el.fileName !== fileName));
				} else {
					message && toast.error(message);
				}
			} catch (error) {
			} finally {
				setLoading(false);
			}
		}
	};

	const router = useRouter();
	const handleDownload = () => {
		router.push(`${process.env.gDriveLink}?export=download&id=${gDriveID}`);
	};

	return (
		<Wrapper>
			<label>{fileNameShortener(fileName, 12)}</label>
			{gDriveID && !loading ? (
				<span role='button' className='ms-auto' onClick={isMessageView ? handleDownload : handleDeleteFile}>
					<Icon path={isMessageView ? downloadCloud : closeCircleFill} width={20} height={20} />
				</span>
			) : (
				<Spinner animation='border' />
			)}
		</Wrapper>
	);
};

interface PropsType extends FileState {
	isMessageView?: boolean;
	loading?: boolean;
	setLoading?: Dispatch<SetStateAction<boolean>>;
	setFiles?: Dispatch<SetStateAction<FileState[]>>;
}

const Wrapper = styled.div`
	padding: 0.3rem;
	margin-right: 0.3rem;
	margin-top: 0.3rem;
	font-size: 0.825rem;
	border: 1px solid gray;
	border-radius: 0.3rem;
	display: flex;
	background-color: gray;
	position: relative;
	width: 140px;
	label {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.spinner-border {
		height: 1rem;
		width: 1rem;
	}
`;
