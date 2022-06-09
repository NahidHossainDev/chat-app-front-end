import Icon, { rupee } from '@libs/icons';
import React, { FC } from 'react';
import styled from 'styled-components';

export const Price: FC<PropsType> = ({ price, previousPrice, className }) => {
	return (
		<Wrapper className={className}>
			<Icon path={rupee} fill="#111111" />
			<span className="price">{price}</span>
			<s className="prev-price">
				<small>&#8377;{previousPrice}</small>
			</s>
		</Wrapper>
	);
};

interface PropsType {
	price: number;
	previousPrice?: number;
	className?: string;
}

const Wrapper = styled.span`
	.price {
		font-size: 1.15rem;
		font-weight: 600;
	}

	.prev-price {
		font-size: 1.15rem;
		font-weight: 500;
		color: var(--bs-secondary);
		margin-left: 0.725rem;
	}
`;
