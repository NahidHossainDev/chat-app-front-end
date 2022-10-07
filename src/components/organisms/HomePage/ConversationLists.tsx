import { Avatar, Button } from "@components/atoms";
import { IActiveUsers } from "@components/templates/HomePage";
import { getConversationState, updateCurrentConversation, updateUnseenCount } from "@store/conversations";
import { getUserState } from "@store/user/user.slice";
import { nameShortener } from "@utils/helpers";
import { FC, useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ConversationHeader } from "./ConversationHeader";
import { SearchModal } from "./SearchModal";

export const ConversationLists: FC<PropsType> = ({ activeUsers, isMobileView = false }) => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const user = useSelector(getUserState);
	const { currentConversaion, allConversations } = useSelector(getConversationState);
	const dispatch = useDispatch();

	return (
		<Wrapper md={3} sm={4} xs={isMobileView ? 12 : 5} className='h-100'>
			<ConversationHeader name={user.name} mobile={user.mobile} />

			<div className='VerticalScroller'>
				{allConversations?.length > 0 ? (
					allConversations.map((el) => {
						const item = user.id === el?.creator?.id ? el.participant : el.creator;
						const isActive = activeUsers?.some((user) => user.userId === item?.id);

						return (
							<ConversationListItem
								key={el?._id}
								className={`ps-2 py-1 border-bottom border-secondary d-flex ${
									currentConversaion?._id === el._id && "active"
								}`}
								role='button'
								onClick={(e) => {
									e.preventDefault();
									dispatch(updateCurrentConversation(el));
									dispatch(updateUnseenCount(el._id, "REMOVE"));
								}}
							>
								{item?.avatar && (
									<Avatar
										size='sm'
										className='me-1'
										src={`https://drive.google.com/uc?export=view&id=${item?.avatar}`}
									/>
								)}
								<div>
									<p className='mb-0 text-light d-flex align-items-center'>
										{nameShortener(item?.name)}
										{user.id !== el?.lastSenderId && el?.unseenMsgCount > 0 && (
											<small className='count'>
												{el?.unseenMsgCount < 10 ? el?.unseenMsgCount : "9+"}
											</small>
										)}
									</p>
									<small className='text-secondary position-relative'>{item?.mobile}</small>
								</div>
								<span className={`text-primary2 ms-auto ${isActive ? "active-user" : ""}`} />
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
			<SearchModal show={showModal} setShow={setShowModal} />
		</Wrapper>
	);
};

interface PropsType {
	activeUsers: IActiveUsers[];
	isMobileView?: boolean;
}

const Wrapper = styled(Col)`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	max-height: 100vh;

	.VerticalScroller {
		height: 100%;
		overflow-y: auto;
		margin: 1rem 0;
	}

	.create-new-chat {
		background-color: #016956;
		padding: 0.5rem;
		border-radius: 0.4rem;
		text-align: center;
		margin-top: auto;
		margin-bottom: 0.6rem;
	}

	.count {
		padding: 0 0.2rem;
		border-radius: 7px;
		background-color: var(--bs-danger);
		margin-left: auto;
		font-size: 12px;
	}
`;

const ConversationListItem = styled.div`
	position: relative;
	.active-user {
		height: 0.7rem;
		width: 0.7rem;
		border-radius: 50%;
		background-color: green;
		position: absolute;
		right: 15px;
		top: 20px;
	}
	&.active {
		background-color: #29363d;
	}
	&:hover {
		background-color: #29363d;
	}
`;
