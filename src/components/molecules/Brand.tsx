import { ImageProps } from '@components/atoms';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export const Brand: FC<BrandProps> = ({ isClickable, ...rest }) => {
	if (isClickable) {
		return (
			<Link href="/">
				<a>
					<Image height={65} width={180} src="/Images/logo.png" alt="brand logo" />
				</a>
			</Link>
		);
	}

	return <Image height={65} width={180} src="/Images/logo.png" alt="brand logo" />;
};

export interface BrandProps extends Omit<ImageProps, 'src' | 'fluid'> {
	isClickable?: boolean;
}

Brand.defaultProps = {
	isClickable: false,
};

// export const Image = styled(Img)`
// 	display: inline-block;
// 	margin: 0 auto;
// `;
