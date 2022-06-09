import { FC, ImgHTMLAttributes } from 'react';
import { ImgWrapper } from './styles';

export const Image: FC<ImageProps> = ({ ...rest }) => <ImgWrapper {...rest} />;

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	fluid?: boolean;
	thumbnail?: boolean;
	rounded?: boolean;
}

Image.defaultProps = {
	fluid: false,
	thumbnail: false,
	rounded: false,
};
