import { DropdownItem } from "@components/atoms";
import { IconDropdown } from "@components/molecules";
import { useWindowSize } from "@libs/hooks/useWindowSize";
import Icon, { arrowLeft, riSettings } from "@libs/icons";
import { revokeAuthUser } from "@store/user/user.action";
import Router from "next/router";
import { FC } from "react";
import styled from "styled-components";

export const ConversationHeader: FC<PropsType> = ({ name, mobile }) => {
	const isMobileView = useWindowSize().width < 525.9;

	return (
		<Wrapper>
			<div className={`d-flex ${isMobileView ? "justify-content-between" : "align-item-center"}`}>
				{isMobileView && (
					<div className='d-flex align-items-center'>
						<span>
							<Icon path={arrowLeft} />
						</span>
					</div>
				)}
				<div className='user'>
					<p className='mb-0 text-light'>{name}</p>
					<small className='text-secondary'>{mobile}</small>
				</div>
				<span role='button' className={!isMobileView && "ms-auto"}>
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

interface PropsType {
	name: string;
	mobile: string;
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
