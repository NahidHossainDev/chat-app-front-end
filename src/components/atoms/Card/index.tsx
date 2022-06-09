import React, { FC, HtmlHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export const Card: FC<PropsType> = ({ children, ...rest }) => {
	return <Wrapper {...rest}>{children}</Wrapper>;
};

interface PropsType extends HtmlHTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	border?: boolean;
	shadow?: boolean;
}

const Wrapper = styled.div<PropsType>`
	width: 100%;
	min-height: 1.25rem;
	padding: 0.825rem;
	background-color: white;
	border-radius: 0.625rem;

	${({ shadow }) =>
		shadow &&
		css`
			/* box-shadow: 0px 0px 4px 1px #e2eaf8; */
			box-shadow: 1px 1px 3px 1px #e2eaf8;
		`}

	${({ border }) =>
		border &&
		css`
			border: 1px solid var(--border);
		`}
`;
