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
					<IconDropdown variant='primary' path={riSettings} height={18} width={18}>
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
	border-bottom: 1px solid var(--bs-secondary);
	border-right: 1px solid var(--bs-secondary);
	border-left: 1px solid var(--bs-secondary);
`;
