import Icon, { riSettings } from "@libs/icons";
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
					<Icon path={riSettings} />
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
