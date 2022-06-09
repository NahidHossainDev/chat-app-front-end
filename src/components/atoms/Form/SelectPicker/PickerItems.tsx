import { formatStatus } from '@utils/helpers';
import { Dispatch, FC, SetStateAction } from 'react';
import { InitialPicker, SelectPickerItemProps } from '.';
import { NavItems, NavItem } from './styles';

export const PickerItems: FC<PickerItemsProps> = (props) => {
	const { isMenu, items, isFocused, isSelected, setPicker, handleClick } = props;

	if (isMenu && items?.length > 0) {
		return (
			<NavItems>
				{items.map(({ label, value }, i) => (
					<NavItem
						key={i}
						className={`${isFocused === value ? ' isFocused' : ''}${
							isSelected === value ? ' isActive' : ''
						}`}
						onMouseOver={() => setPicker((prevState) => ({ ...prevState, isFocused: value }))}
						onClick={() => handleClick(value)}
					>
						{formatStatus(label)}
					</NavItem>
				))}
			</NavItems>
		);
	}

	return null;
};

export interface PickerItemsProps extends InitialPicker {
	items: SelectPickerItemProps[];
	setPicker: Dispatch<SetStateAction<InitialPicker>>;
	handleClick: (value: string) => void;
}
