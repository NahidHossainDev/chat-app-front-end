import { Avatar, DropdownItem } from "@components/atoms";
import { IconDropdown } from "@components/molecules";
import { ICreatorOrParticipant } from "@libs/api/interface";
import Icon, { arrowLeft, riSettings } from "@libs/icons";
import { getAppState, updateShowSidebar } from "@store/app/app.slice";
import { updateCurrentConversation } from "@store/conversations.slice";
import { revokeAuthUser } from "@store/user/user.action";
import { fileNameShortener } from "@utils/helpers";
import Router from "next/router";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export const ConversationHeader: FC<PropsType> = ({ user, backArrow }) => {
	const dispatch = useDispatch();
	const { isMobile } = useSelector(getAppState);

	const closeSidebar = () => {
		dispatch(updateShowSidebar(false));
		dispatch(updateCurrentConversation(null));
	};

	return (
		<Wrapper>
			<div className={`d-flex ${isMobile ? "justify-content-between" : "align-item-center"}`}>
				{backArrow && (
					<div className='d-flex align-items-center'>
						<span role='button' onClick={closeSidebar}>
							<Icon path={arrowLeft} />
						</span>
					</div>
				)}
				<div className='user d-flex'>
					<Avatar size='sm' className='me-2' src={user?.avatar ? user.avatar : "/image/default-avatar.jpg"} />

					<div>
						<p className='mb-0 text-light'>{user?.name}</p>
						<small className='text-secondary'>{fileNameShortener(user?.email)}</small>
					</div>
				</div>
				<span role='button' className={!isMobile ? "ms-auto" : ""}>
					<IconDropdown
						alignRight
						variant='primary'
						style={{ background: "transparent", border: "none" }}
						path={riSettings}
						fill='#ffffff'
						height={20}
						width={20}
					>
						<DropdownItem
							type='button'
							onClick={async () => {
								await revokeAuthUser();
								Router.push("/");
							}}
						>
							Log Out
						</DropdownItem>
					</IconDropdown>
				</span>
			</div>
		</Wrapper>
	);
};

ConversationHeader.defaultProps = {
	backArrow: false,
};

interface PropsType {
	user: ICreatorOrParticipant;
	backArrow?: boolean;
}

const Wrapper = styled.div`
	background-color: #29363d;
	margin: 0 calc(var(--bs-gutter-x) * -0.5);
	padding: calc(var(--bs-gutter-x) * 0.5);
	border-right: 1px solid var(--bs-secondary);

	@media only screen and (max-width: 525.9px) {
		padding: 1rem;
		padding-right: 0;
	}
`;
