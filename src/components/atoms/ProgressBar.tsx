import React, { FC } from 'react';
import styled from 'styled-components';

export const ProgressBar: FC<PropsType> = ({ total, ratingOf }) => {
	return (
		<Wrapper>
			<div
				className={`progress-bar ${ratingOf > 2 && 'green-bg'}
                                    ${ratingOf === 2 && 'orange-bg'}
                                    ${ratingOf === 1 && 'red-bg'}`}
				style={{ width: `${total * 2}%` }}
				role="progressbar"
				aria-valuenow={total}
				aria-valuemin={0}
				aria-valuemax={100}
			/>
		</Wrapper>
	);
};

interface PropsType {
	total: number;
	ratingOf: number;
}

const Wrapper = styled.div`
	width: 9rem;
	margin: 0 0.5rem;
	height: 0.3rem;
	background-color: var(--border);

	.green-bg {
		height: 0.3rem;
		background-color: #00ad4c;
	}
	.red-bg {
		height: 0.3rem;
		background-color: #ed1c24;
	}
	.orange-bg {
		height: 0.3rem;
		background-color: #ff8100;
	}
`;
