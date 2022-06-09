import { removeNumInputArrow } from '@components/Global.style';
import { daysForSelector } from '@utils/constants';
import React, { FC, useState } from 'react';
import styled from 'styled-components';

export const CustomInputWithSelectBox: FC = () => {
	const [count, setCount] = useState<number>(Number(daysForSelector[0]));

	const onInputChange = (event) => {
		setCount(Number(event.target.value));
	};

	return (
		<Wrapper>
			<select onClick={onInputChange}>
				{daysForSelector.map((el, i) => (
					<option key={i} value={el}>
						{el}
					</option>
				))}
			</select>
			<input type="number" value={count} onChange={onInputChange} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	background-color: white;
	border: 1px solid var(--border);
	width: 160px;
	height: 38px;
	border-radius: 7px;

	input,
	select {
		position: absolute;
		top: 0px;
		left: 0px;
		border: none;
		border-radius: 7px;
		width: 96%;
		height: 100%;
		font-size: 16px;
		cursor: pointer;
	}

	input {
		width: 76%;
		padding: 0 7px;
		text-align: center;
		${removeNumInputArrow}
	}

	select:focus,
	input:focus {
		outline: none;
	}
`;
