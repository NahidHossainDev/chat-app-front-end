/* eslint-disable indent */

import { FormInput, FormInputProps } from '@components/atoms';
import Icon, { IconProps } from '@libs/icons';
import { FC } from 'react';
import styled, { css } from 'styled-components';

export const IconInput: FC<IconInputProps> = (props) => {
	const { icon, srOnly, iconPosition, bgGray, width, height, fill, ...rest } = props;
	const wrapperProps = { srOnly, iconPosition, bgGray };
	const inputProps = { srOnly, ...rest };
	const iconProps = { width, height, fill };

	return (
		<IconInputWrapper {...wrapperProps}>
			<FormInput {...inputProps} />
			<Icon path={icon} {...iconProps} />
		</IconInputWrapper>
	);
};

interface IconInputProps
	extends Omit<FormInputProps, 'height' | 'width'>,
		Pick<IconProps, 'width' | 'height' | 'fill'> {
	icon: string;
	iconPosition?: 'start' | 'end';
	bgGray?: boolean;
}

IconInput.defaultProps = {
	bgGray: false,
	iconPosition: 'end',
};

export const IconInputWrapper = styled.div<FormInputProps & Omit<IconInputProps, 'icon'>>`
	position: relative;

	svg {
		position: absolute;
		padding: 0.188rem;

		${({ srOnly }) => {
			if (srOnly) {
				return css`
					top: calc(50% - 0.75rem);
				`;
			} else {
				return css`
					top: calc(50% + 0.775rem - 0.75rem);
				`;
			}
		}}
	}

	input {
		transition: background-color 0.5s ease-in-out;

		${({ bgGray }) => {
			if (bgGray) {
				return css`
					background-color: #fcfcfc;

					&:focus {
						background-color: white;
					}
				`;
			} else {
				return css`
					background-color: white;

					&:focus {
						background-color: white;
					}
				`;
			}
		}}
	}

	${({ iconPosition }) => {
		if (iconPosition === 'start') {
			return css`
				svg {
					left: 0.513rem;
				}
				input {
					padding-left: 2.575rem;
				}
			`;
		} else if (iconPosition === 'end') {
			return css`
				svg {
					right: 0.313rem;
				}
				input {
					padding-right: 1.875rem;
				}
			`;
		}
	}}
`;
