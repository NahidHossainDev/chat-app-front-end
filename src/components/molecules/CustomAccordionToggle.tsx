import { Button, ButtonProps } from '@components/atoms';
import React, { FC, ReactChild } from 'react';
import { useAccordionButton } from 'react-bootstrap';

export const CustomAccordionToggle: FC<PropsType> = ({ children, eventKey, onClickFC, ...rest }) => {
	const decoratedOnClick = useAccordionButton(eventKey, () => {
		onClickFC();
	});

	return (
		<Button rounded onClick={decoratedOnClick} {...rest}>
			<>{children}</>
		</Button>
	);
};

interface PropsType extends ButtonProps {
	children: ReactChild;
	eventKey: string;
	onClickFC?: Function;
}
