import styled, { css } from 'styled-components';
import { FormInputProps } from '.';
import { getThemeColor } from './../../utils';

interface FromControlProps extends Pick<FormInputProps, 'pill' | 'rounded' | 'sharp'> {
	invalid?: boolean;
}

export const FormGroup = styled.div<{ noMargin?: boolean }>`
	display: block;
	margin-bottom: ${({ noMargin }) => (noMargin ? '0rem' : '1rem')};
`;

export const FormLabel = styled.label<FormInputProps>`
	display: inline-block;
	margin-bottom: 0.25rem;

	${({ srOnly }) => {
		if (srOnly) {
			return css`
				position: absolute;
				width: 1px;
				height: 1px;
				padding: 0;
				overflow: hidden;
				clip: rect(0, 0, 0, 0);
				white-space: nowrap;
				-webkit-clip-path: inset(50%);
				clip-path: inset(50%);
				border: 0;
			`;
		}
	}}

	&:after {
		${({ required }) => {
			if (required) {
				return css`
					content: ' *';
					color: var(--danger);
				`;
			}
		}}
	}
`;

export const FormControl = styled.input<FromControlProps>`
	width: 100%;
	display: block;
	padding: 0.532rem 1rem;
	border: 1px solid var(--border);
	transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	border-radius: ${({ pill, rounded, sharp }) => (pill ? '50rem' : rounded ? '0.25rem' : sharp ? '0rem' : '0.1rem')};

	&:focus {
		outline: none;
		border-color: ${getThemeColor('primary')};
		box-shadow: 0 0 0 0.2rem rgba(0, 181, 91, 0.25);
	}

	&:disabled {
		pointer-events: none;
		filter: none;
		opacity: 0.5;
	}

	${({ invalid }) => {
		if (invalid) {
			return css`
				border-color: ${getThemeColor('danger')};
				box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);

				&:focus {
					border-color: ${getThemeColor('danger')};
					box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
				}
			`;
		}
	}}
`;

export const FormFeedback = styled.p`
	color: ${getThemeColor('danger')};
	margin-bottom: 0;
`;
