import { Button } from "@components/atoms";
import { FC, useState } from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import { SearchModal } from "./SearchModal";

export const ConversationLists: FC = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	return (
		<Wrapper xs={3} className='h-100'>
			<div className='all-friends-container'>
				<ConversationListItem className='px-3 py-1 border-bottom border-secondary'>
					<p className='mb-0 text-light'>Name</p>
					<span className='text-secondary'>343254356</span>
				</ConversationListItem>
				<ConversationListItem className='px-3 py-1 border-bottom border-secondary '>
					<p className='mb-0 text-light'>Name</p>
					<span className='text-secondary'>343254356</span>
				</ConversationListItem>
				<ConversationListItem className='px-3 py-1 border-bottom border-secondary '>
					<p className='mb-0 text-light'>Name</p>
					<span className='text-secondary'>343254356</span>
				</ConversationListItem>
			</div>

			<Button
				block
				variant='primary'
				className='create-new-chat '
				type='button'
				onClick={() => setShowModal(true)}
			>
				Create New Chat
			</Button>
			<SearchModal show={showModal} setShow={setShowModal} />
		</Wrapper>
	);
};

const Wrapper = styled(Col)`
	.all-friends-container {
		height: calc(100vh - 80px);
	}
	.create-new-chat {
		background-color: #016956;
		padding: 0.75rem;
		border-radius: 0.4rem;
		text-align: center;
	}
`;

const ConversationListItem = styled.div`
	&:hover {
		background-color: #29363d;
		cursor: pointer;
	}
`;
