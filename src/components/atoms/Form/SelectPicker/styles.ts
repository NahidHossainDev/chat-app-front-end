import styled from "styled-components";
export * from "../FormInput/styles";

export const Indicator = styled.div`
	position: absolute;
	top: calc(50% - 0.703rem);
	right: 10px;
	transition: 300ms ease all;

	&.isFocused {
		transform: rotate(180deg);
	}
`;

export const NavItems = styled.ul`
	width: 100%;
	max-height: 300px;
	overflow: hidden;
	overflow-y: auto;
	position: absolute;
	top: calc(100% + 5px);
	left: 0;
	margin: 0;
	padding: 4px 0;
	border-radius: 0.25rem;
	background-color: var(--bs-white);
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 11px rgba(0, 0, 0, 0.1);
	z-index: 99;
`;

export const PickerWrapper = styled.div`
	position: relative;

	.form-control[readonly]:not(:disabled) {
		cursor: pointer;
		background-color: transparent;
	}
`;

export const NavItem = styled.li`
	width: 100%;
	list-style: none;
	display: block;
	padding: 8px 12px;
	cursor: pointer;

	&.isFocused {
		background-color: rgba(0, 181, 91, 0.2);
	}

	&.isActive {
		color: var(--bs-white);
		background-color: var(--bs-primary);
	}
`;
