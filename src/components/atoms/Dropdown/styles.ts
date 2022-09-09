import styled, { css } from "styled-components";
import { DropdownProps } from ".";

export const DropdownWrapper = styled.div`
	position: relative;
`;

export const DropdownList = styled.div<Pick<DropdownProps, "alignRight">>`
	position: absolute;
	top: 100%;
	min-width: 10rem;
	padding: 0.625rem 0;
	margin: 0 0 0 auto;
	text-align: left;
	display: block;
	background-color: var(--bs-white);
	border-radius: 0.425rem;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
	z-index: 1000;

	${({ alignRight }) => {
		if (alignRight) {
			return css`
				right: 0;
			`;
		} else {
			return css`
				left: 0;
			`;
		}
	}}

	.dropdown_Item {
		width: 100%;
		display: block;
		color: var(--bs-dark);
		text-align: left;
		padding: 0.313rem 1rem;
		border: 0;
		background-color: transparent;
		white-space: nowrap;
		clear: both;

		&:hover {
			cursor: pointer;
			text-decoration: none;
			background-color: var(--bs-light);
		}
	}
`;

export const DropdownDivider = styled.div`
	height: 0;
	margin: 0.5rem 0;
	overflow: hidden;
	border-top: 1px solid var(--border);
`;
