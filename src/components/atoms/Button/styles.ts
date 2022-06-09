/* eslint-disable indent */
import styled, { css } from 'styled-components';
import { ButtonProps } from '.';
import { getThemeColor } from '../utils';

export const Wrapper = styled.button<ButtonProps>`
	text-align: center;
	/* height: 50px; */
	border: 1px solid transparent;

	${({ size }) => {
		switch (size) {
			case 'sm':
				return css`
					padding: 0.156rem 0.75rem;
				`;

			case 'md':
				return css`
					padding: 0.425rem 0.75rem;
				`;

			case 'lg':
				return css`
					padding: 0.688rem 0.75rem;
				`;

			case 'xl':
				return css`
					padding: 0.907rem 0.75rem;
				`;

			default:
				return css`
					padding: 0.532rem 0.75rem;
				`;
		}
	}}
	${({ block }) => {
		if (block) {
			return css`
				width: 100%;
				display: block;
			`;
		} else {
			return css`
				display: inline-block;
			`;
		}
	}};
	${({ variant, outline }) => {
		switch (variant) {
			case 'link':
				return css`
					color: ${getThemeColor('primary')};
					border-color: transparent;
					background-color: transparent;
				`;

			case 'light':
				return css`
					color: ${getThemeColor('dark')};
				`;

			default:
				if (outline) {
					return css`
						color: ${getThemeColor(variant)};
						border-color: ${getThemeColor(variant)};
						background-color: transparent;
					`;
				} else {
					return css`
						color: ${getThemeColor('white')};
						border-color: ${getThemeColor(variant)};
						background-color: ${getThemeColor(variant)};

						&:hover {
							opacity: 0.95;
						}
					`;
				}
		}
	}};
	border-radius: ${({ pill, rounded, sharp }) =>
		pill ? '50rem' : rounded ? '0.25rem' : sharp ? '0rem' : '0.125rem'};
	transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
		opacity 0.2s ease-in-out;

	&:hover {
		${({ variant, outline }) => {
			if (outline && variant !== 'link') {
				return css`
					color: ${getThemeColor('white')};
					background-color: ${getThemeColor(variant)};
				`;
			} else {
				return css`
					opacity: 0.95;
				`;
			}
		}}
	}

	&:disabled {
		opacity: 0.65;
		cursor: not-allowed;
	}
`;
