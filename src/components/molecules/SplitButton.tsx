import { Button } from '@components/atoms';
import { Variant } from '@components/atoms/interfaces';
import { vertical_horizontal_center } from '@components/Global.style';
import Icon from '@libs/icons';
import React, { FC } from 'react';
import styled from 'styled-components';

export const SplitButton: FC<PropsType> = ({ variant, label, iconPath, clickHandler }) => {
	return (
		<ButtonWrapper variant={variant} onClick={clickHandler}>
			<span className="btn-text">{label}</span>
			<span className="right-icon">
				<Icon path={iconPath} fill="#ffffff" />
			</span>
		</ButtonWrapper>
	);
};

interface PropsType {
	label: string;
	iconPath: string;
	variant: 'primary' | 'warning' | 'dark';
	clickHandler?: () => void;
}

const ButtonWrapper = styled(Button)<{ variant: Variant }>`
	width: 100%;
	${vertical_horizontal_center}
	padding: 0;
	border: none;
	background-color: ${({ variant }) => leftBG[variant]};
	text-transform: uppercase;

	.btn-text {
		width: 100%;
		border-top-left-radius: 0.2rem;
		border-bottom-left-radius: 0.2rem;
	}

	.right-icon {
		width: 3.125rem;
		height: 2.625rem;
		${vertical_horizontal_center}
		border-top-right-radius: 0.2rem;
		border-bottom-right-radius: 0.2rem;
		background-color: ${({ variant }) => rightBG[variant]};
	}
`;

export const leftBG = {
	primary: '#00ad4c',
	warning: '#f7941d',
	dark: '#252525',
};

export const rightBG = {
	primary: '#009147',
	warning: '#f26522',
	dark: '#000000',
};
