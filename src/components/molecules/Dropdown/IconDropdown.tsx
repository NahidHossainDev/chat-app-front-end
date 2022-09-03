import { ButtonProps, Dropdown, DropdownProps } from "@components/atoms";
import Icon, { IconProps } from "@libs/icons";
import { FC } from "react";
import styled from "styled-components";

export const IconDropdown: FC<IconDropdownProps> = (props) => {
	const { isCount, count, path, width, height, fill, children, ...rest } = props;
	const iconProps = { path, width, height, fill };

	return (
		<Dropdown
			buttonLabel={
				<div className='position-relative'>
					<Icon {...iconProps} /> {isCount && <Count>{count}</Count>}
				</div>
			}
			{...rest}
		>
			{children}
		</Dropdown>
	);
};

export interface IconDropdownProps
	extends Omit<DropdownProps, "buttonLabel">,
		Pick<IconProps, "path" | "width" | "height" | "fill">,
		ButtonProps {
	isCount?: boolean;
	count?: number;
}

IconDropdown.defaultProps = {
	variant: "link",
	fill: "var(--bs-dark)",
	isCount: false,
	count: 0,
};

const Count = styled.span`
	width: 1rem;
	height: 1rem;
	font-size: 0.625rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50rem;
	position: absolute;
	top: -3px;
	right: -3px;
	color: var(--bs-white);
	background-color: var(--bs-primary);
`;
