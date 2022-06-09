import { useRouter } from 'next/router';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { ViewMoreBtn } from './ViewMoreBtn';

export const SectionTitle: FC<PropsType> = ({
	title,
	isHr,
	isViewMoreBtn,
	textAlign = 'between',
	btnURL,
	isUnderline,
}) => {
	const router = useRouter();
	return (
		<Wrapper isUnderline={isUnderline} className={`d-flex justify-content-${textAlign} my-5 px-3`}>
			<h2 className="m-0">{title}</h2>
			{isHr && <div className="hr"></div>}
			{isViewMoreBtn && (
				<ViewMoreBtn className="view-more-btn" onClick={() => router.push(btnURL ? btnURL : '')}>
					View More
				</ViewMoreBtn>
			)}
		</Wrapper>
	);
};

interface PropsType {
	title: string;
	isHr?: boolean;
	isViewMoreBtn?: boolean;
	btnURL?: string;
	textAlign?: 'center' | 'between';
	isUnderline?: boolean;
}

const Wrapper = styled.div<{ isUnderline: boolean }>`
	h2 {
		font-size: 2rem;
		text-transform: uppercase;
		position: relative;

		${({ isUnderline }) => {
			if (isUnderline) {
				return css`
					&::after {
						position: absolute;
						content: '';
						height: 0.25rem;
						bottom: -0.25rem;
						transform: translateX(-50%);
						left: 50%;
						width: 105%;
						background: #3cb878;
					}
				`;
			}
		}}
	}
`;
