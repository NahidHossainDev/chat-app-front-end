import { useClickOutside } from '@libs/hooks';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Button, ButtonProps } from '../Button';
import { DropdownDivider, DropdownList, DropdownWrapper } from './styles';

export const Dropdown: FC<DropdownProps> = ({ buttonLabel, children, alignRight, isOpen, ...rest }) => {
	const [isActive, setActive] = useState<boolean>(false);
	const { wrapperRef } = useClickOutside(() => setActive(false));
	const listProps = { alignRight };

	useEffect(() => {
		setActive(isOpen);
	}, [isOpen]);

	return (
		<DropdownWrapper ref={wrapperRef}>
			<Button
				{...rest}
				onClick={(e) => {
					if (rest?.onClick) {
						rest.onClick(e);
					}
					setActive(!isActive);
				}}
			>
				{buttonLabel}
			</Button>
			{isActive && (
				<DropdownList className="DropdownList" {...listProps}>
					{children}
				</DropdownList>
			)}
		</DropdownWrapper>
	);
};

export interface DropdownProps extends ButtonProps {
	buttonLabel: ReactNode;
	alignRight?: boolean;
	isOpen?: boolean;
}

Dropdown.defaultProps = {
	alignRight: false,
};

export * from './DropdownItem';
export { DropdownWrapper, DropdownDivider };
