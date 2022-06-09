import { Button } from '@components/atoms';
import React, { FC } from 'react';
import styled from 'styled-components';

export const ViewMoreBtn: FC<any> = ({ ...rest }) => {
	return <Wrapper size="md" {...rest} />;
};

const Wrapper = styled(Button)`
	background-color: var(--primary-two);

	box-shadow: 0rem 0.1rem 0.2rem var(--primary-box-shadow);
	display: inline-block;
	letter-spacing: 1px;
	border-radius: 3px;
`;
