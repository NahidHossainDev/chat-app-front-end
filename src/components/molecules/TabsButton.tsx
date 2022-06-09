import React, { FC } from 'react';
import styled from 'styled-components';

export const TabsButton: FC<PropsType> = ({ tabs, activeTab, clickHandler }) => {
	return (
		<Wrapper>
			{tabs.map((el, i) => (
				<div key={i} className={`tab ${el === activeTab ? 'active' : ''}`} onClick={() => clickHandler(el)}>
					{el}
				</div>
			))}
		</Wrapper>
	);
};

interface PropsType {
	tabs: string[];
	activeTab: string;
	clickHandler: React.Dispatch<React.SetStateAction<string>>;
}

const Wrapper = styled.div`
	display: flex;
	border: 0.1rem solid var(--border);
	border-radius: 0.5rem;
	text-transform: capitalize;
	transition: all 0.5s ease-in-out;

	.tab {
		font-weight: 450;
		text-transform: uppercase;
		width: 100%;
		text-align: center;
		padding: 0.825rem 0;
		cursor: pointer;
	}
	.active {
		color: white !important;
		background: #00a651 !important;
		border-radius: 7px;
		transition: all 0.2s ease-in-out;
	}
`;
