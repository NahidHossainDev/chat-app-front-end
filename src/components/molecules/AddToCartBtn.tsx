import { Button } from '@components/atoms';
import { Variant } from '@components/atoms/interfaces';
import { vertical_horizontal_center } from '@components/Global.style';
import Icon, { subtract } from '@libs/icons';
import React, { ChangeEvent, FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { leftBG, rightBG } from './SplitButton';

export const AddToCartBtn: FC<PropsType> = ({ variant, label, iconPath }) => {
	// States ------->
	const [count, setCount] = useState<number>(0);
	const [isFocus, setFocus] = useState<boolean>(false);

	// Functions ----->
	const stopPropagationForAll = (e) => {
		e.stopPropagation();
	};

	const handleIncrement = () => {
		setCount(count + 1);
	};

	const handleDecrement = () => {
		count > 0 ? setCount(count - 1) : setCount(count + 1);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		`${count}`.length < 21 && setCount(Number(e.target.value));
	};

	return (
		<ButtonWrapper variant={variant} count={count} focus={isFocus} onClick={(e) => stopPropagationForAll(e)}>
			<span className="left" onClick={handleDecrement}>
				{count || isFocus ? <Icon path={subtract} height={22} width={22} fill="#ffffff" /> : label}
			</span>
			<input value={count} min={1} onFocus={() => setFocus(!isFocus)} onChange={(e) => handleInputChange(e)} />
			<span className="right" onClick={handleIncrement}>
				<Icon path={iconPath} height={22} width={22} fill="#ffffff" />
			</span>
		</ButtonWrapper>
	);
};

interface PropsType {
	label: string;
	iconPath: string;
	variant: 'primary' | 'warning' | 'dark';
}

const ButtonWrapper = styled(Button)<{ variant: Variant; count: number; focus: boolean }>`
	width: 100%;
	padding: 0;
	border: none;
	font-size: 1rem;
	${vertical_horizontal_center}

	.left {
		height: 2.625rem;
		border-top-left-radius: 0.2rem;
		border-bottom-left-radius: 0.2rem;
		background-color: ${({ variant }) => leftBG[variant]};
		width: 100%;
		${vertical_horizontal_center}
	}

	.right {
		width: 3.125rem;
		height: 2.625rem;
		border-top-right-radius: 0.2rem;
		border-bottom-right-radius: 0.2rem;
		background-color: ${({ variant }) => rightBG[variant]};
		${vertical_horizontal_center}
	}

	input {
		height: 2.625rem;
		font-size: 1.25rem;
		padding: 0;
		width: 0%;
		text-align: center;
		background-color: #f3f3f3;
		border: none;
		outline: none;
		color: var(--bs-primary);
	}

	${({ count, focus }) => {
		if (count > 0 || focus) {
			return css`
				input {
					width: 100%;
					transition: 0.3s ease-in-out;
				}

				.right,
				.left {
					width: 4.25rem;
					background: var(--bs-primary);
					transition: 0.3s ease-in-out;
				}
			`;
		}
	}}
`;
