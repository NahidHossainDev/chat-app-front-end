import { Button } from "@components/atoms";
import { IActiveUsers } from "@components/templates/HomePage";
import { all_API } from "@libs/api/allApi";
import { IConversationList } from "@libs/api/interface/user";
import { getUserState } from "@store/user/user.slice";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ConversationHeader } from "./ConversationHeader";
import { SearchModal } from "./SearchModal";

export const ConversationLists: FC<PropsType> = ({ activeConv, setActiveConv, activeUsers }) => {
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

	console.log(activeUsers);

	return (
		<Wrapper xs={3} className='h-100'>
			<ConversationHeader name={user.name} mobile={user.mobile} />
			<div className='all-friends-container VerticalScroller'>
				{conversations?.length > 0 ? (
					conversations.map((el) => {
						const item = user.id === el.creator.id ? el.participant : el.creator;
						const isActive = activeUsers?.some((user) => user.userId === item.id);

						return (
							<ConversationListItem
								key={el?._id}
								className={`px-3 py-1 border-bottom border-secondary ${
									activeConv?._id === el._id && "active"
								}`}
								role='button'
								onClick={() => setActiveConv(el)}
							>
								<p className='mb-0 text-light'>{item.name}</p>
								<small className='text-secondary'>
									{item?.mobile} <span className='text-success'> {isActive ? "(Active)" : ""}</span>
								</small>
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
			<SearchModal
				show={showModal}
				setShow={setShowModal}
				getConversations={getAllConversations}
				setSelectedConversation={setActiveConv}
			/>
		</Wrapper>
	);
};

interface PropsType {
	activeConv: IConversationList;
	activeUsers: IActiveUsers[];
	setActiveConv: Dispatch<SetStateAction<IConversationList>>;
}

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
	&.active {
		background-color: #29363d;
	}
	&:hover {
		background-color: #29363d;
	}
`;
