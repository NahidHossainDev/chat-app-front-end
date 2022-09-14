import { DropdownItem } from "@components/atoms";
import { IconDropdown } from "@components/molecules";
import { riSettings } from "@libs/icons";
import { revokeAuthUser } from "@store/user/user.action";
import Router from "next/router";
import { FC } from "react";
import styled from "styled-components";

export const ConversationHeader: FC<PropsType> = ({ name, mobile }) => {
	return (
		<Wrapper>
			<div className='d-flex align-items-center'>
				<div>
					<p className='mb-0 text-light'>{name}</p>
					<small className='text-secondary'>{mobile}</small>
				</div>
				<span role='button' className='ms-auto'>
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
