import React, { FC, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export const CustomCheckbox: FC<PropsType> = ({ label, type, disabled, changeHandler, ...rest }) => {
	return (
		<Wrapper disabled={disabled}>
			{label}
			<input {...rest} type={type} disabled={disabled} onChange={(e) => changeHandler(e?.target)} />
			<span className="checkmark"></span>
		</Wrapper>
	);
};

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	value: string;
	label: string;
	type: 'checkbox' | 'radio';
	changeHandler?: (e) => void;
}

const Wrapper = styled.label<{ disabled?: boolean }>`
	font-size: 14px;
	display: block;
	position: relative;
	padding-left: 35px;
	margin-bottom: 12px;
	font-weight: 500;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	color: ${({ disabled }) => disabled && 'gray'};
	cursor: ${({ disabled }) => !disabled && 'pointer'};

	/* Hide the browser's default checkbox */
	input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	/* Create a custom checkbox */
	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 20px;
		width: 20px;
		border-radius: 3px;
		background-color: #eee;
	}
	/* On mouse-over, add a grey background color */
	${({ disabled }) => {
		if (!disabled) {
			return css`
				&:hover input ~ .checkmark {
					background-color: #ccc;
				}
			`;
		}
	}}
	/* When the checkbox is checked, add a blue background */
	& input:checked ~ .checkmark {
		background-color: #03a753;
	}
	/* Create the checkmark/indicator (hidden when not checked) */
	.checkmark:after {
		content: '';
		position: absolute;
		display: none;
	}
	/* Show the checkmark when checked */
	input:checked ~ .checkmark:after {
		display: block;
	}
	/* Style the checkmark/indicator */
	.checkmark:after {
		left: 7px;
		top: 4px;
		width: 6px;
		height: 10px;
		border: solid white;
		border-width: 0 2px 2px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
`;
