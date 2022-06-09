import Link from 'next/link';
import { FC, ReactChild } from 'react';
import { BreadcrumbWrapper } from './styles';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ data, children }) => {
	if (data?.length > 0) {
		return (
			<BreadcrumbWrapper>
				<ul>
					{data.map(({ title, href }, i) => (
						<li key={i}>{href ? <Link href={href}>{title}</Link> : <span>{title}</span>}</li>
					))}
				</ul>
			</BreadcrumbWrapper>
		);
	}
	return null;
};

export interface BreadcrumbsProps {
	data: BreadcrumbProps[];
	children?: ReactChild;
}

interface BreadcrumbProps {
	href?: string;
	title: string;
}
