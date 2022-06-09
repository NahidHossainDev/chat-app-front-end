import { FC, ImgHTMLAttributes } from 'react';
import { ElementSize } from '../interfaces';
import { AavatarWrapper } from './styles';

export const Avatar: FC<AvatarProps> = ({ src, ...rest }) => <AavatarWrapper src={src} {...rest} />;

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
	size?: ElementSize | 'xs';
}
