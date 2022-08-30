import { IconInput } from "@components/molecules";
import Icon, { close, search } from "@libs/icons";
import { Dispatch, FC, SetStateAction } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";

export const SearchModal: FC<PropsType> = ({ show, setShow }) => {
	return (
		<ModalWrapper show={show} onHide={() => setShow(false)}>
			<Modal.Header>
				<h5 className='mb-0 d-flex w-100'>
					Search Person
					<span className='ms-auto' role='button' onClick={() => setShow(!show)}>
						<Icon path={close} fill='#fff' />
					</span>
				</h5>
			</Modal.Header>
			<Modal.Body>
				<IconInput
					bgGray
					iconPosition='end'
					icon={search}
					srOnly
					placeholder='Search by name, mobile or email'
					name='search'
				/>
			</Modal.Body>
		</ModalWrapper>
	);
};

const ModalWrapper = styled(Modal)`
	.modal-content {
		background-color: #222e35;
		color: white;
		min-height: 15rem;
		.modal-header {
			padding-bottom: 0;
		}
	}
`;

interface PropsType {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
}
