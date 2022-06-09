/* eslint-disable indent */
import styled, { css } from 'styled-components';
import { BadgeProps } from '.';
import { getThemeColor } from './../utils';

export const Wrapper = styled.span<BadgeProps>`
	display: inline-block;
	padding: 0.219rem 1rem;

	${({ variant }) => {
		if (variant !== 'light') {
			return css`
				color: ${getThemeColor('white')};
				background-color: ${getThemeColor(variant)};
			`;
		} else if (variant === 'light' || variant === 'secondary') {
			return css`
				color: ${getThemeColor('primary')};
				background-color: ${getThemeColor(variant)};
			`;
		} else {
			return css`
				background-color: ${getThemeColor(variant)};
			`;
		}
	}}
	${({ rounded, pill }) => {
		if (rounded) {
			return css`
				border-radius: 0.25rem;
			`;
		} else if (pill) {
			return css`
				border-radius: 50rem;
			`;
		}
	}}
`;
