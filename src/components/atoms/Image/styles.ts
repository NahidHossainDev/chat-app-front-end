import { ImageProps } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import { getThemeColor } from './../utils';

export const ImgWrapper = styled.img<ImageProps>`
	${({ rounded }) => {
		if (rounded) {
			return css`
				border-radius: 0.25rem;
			`;
		}
	}}

	${({ fluid }) => {
		if (fluid) {
			return css`
				max-width: 100%;
				height: auto;
			`;
		}
	}}

    ${({ thumbnail }) => {
		if (thumbnail) {
			return css`
				padding: 0.25rem;
                background-color: : ${getThemeColor('white')};
                border: 1px solid ${getThemeColor('border')};
                border-radius: 0.25rem;
			`;
		}
	}}
`;
