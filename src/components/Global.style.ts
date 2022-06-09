import { css } from 'styled-components';

export const vertical_horizontal_center = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const multiLineEllipsis = css<{ lines: number }>`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: ${({ lines }) => lines};
`;

export const removeNumInputArrow = css`
	/* Chrome, Safari, Edge, Opera */
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	/* Firefox */
	&[type='number'] {
		-moz-appearance: textfield;
	}
`;
