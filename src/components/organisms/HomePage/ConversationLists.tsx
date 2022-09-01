import { Button } from "@components/atoms";
import { all_API } from "@pages/api/allApi";
import { IConversationList } from "@pages/api/interface/user";
import { getUserState } from "@store/user/user.slice";
import { FC, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { SearchModal } from "./SearchModal";

export const ConversationLists: FC = () => {
	const [conversations, setConversations] = useState<IConversationList[]>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const user = useSelector(getUserState);

	const getAllConversations = async () => {
		try {
			const { success, data, message } = await all_API.getAllConversation();
			if (success) {
				setConversations((prev) => [...data]);
			}
		} catch (err) {}
	};

	useEffect(() => {
		getAllConversations();
	}, []);

	return (
		<Wrapper xs={3} className='h-100'>
			<div className='all-friends-container'>
				{conversations?.length > 0 ? (
					conversations.map((el) => {
						const item = user.id === el.creator.id ? el.participant : el.creator;
						return (
							<ConversationListItem key={el?._id} className='px-3 py-1 border-bottom border-secondary'>
								<p className='mb-0 text-light'>{item.name}</p>
								<small className='text-secondary'>{item?.mobile}</small>
							</ConversationListItem>
						);
					})
				) : (
					<div className='h-100 d-flex align-items-center justify-content-center'>
						<h6 className='text-center text-secondary'>You have no conversation yet!</h6>
					</div>
				)}
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
			<SearchModal show={showModal} setShow={setShowModal} getConversations={getAllConversations} />
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
