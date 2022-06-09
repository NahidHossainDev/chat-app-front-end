import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

export const DropdownItem: FC<DropdownItemProps> = ({ type, href, children, className, ...rest }) => {
	const dropdownItemProps = { className: `dropdown_Item ${className}`, ...rest };

	if (type === 'button') {
		return <button {...dropdownItemProps}>{children}</button>;
	}

	return (
		<Link href={href} passHref>
			<a {...dropdownItemProps}>{children}</a>
		</Link>
	);
};

export interface DropdownItemProps extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
	type?: 'button' | 'a';
	href?: string;
}

DropdownItem.defaultProps = {
	type: 'a',
};
