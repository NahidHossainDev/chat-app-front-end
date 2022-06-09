import { FC, HTMLAttributes } from 'react';
import { BadgeVariant, ElementBorders } from '../interfaces';
import { Wrapper } from './styles';

export const Badge: FC<BadgeProps> = ({ children, ...rest }) => <Wrapper {...rest}>{children}</Wrapper>;

export interface BadgeProps extends Pick<ElementBorders, 'rounded' | 'pill'>, HTMLAttributes<HTMLElement> {
	variant?: BadgeVariant;
}

Badge.defaultProps = {
	variant: 'primary',
	rounded: false,
	pill: false,
};
