import { Card } from '@components/atoms';
import React, { FC, ReactChild, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { CustomAccordionToggle } from './CustomAccordionToggle';

export const AccordionCard: FC<PropsType> = ({ title, subTitle, rightBtn, children }) => {
	const [open, setOpen] = useState<boolean>(false);

	const saveChange = () => {
		setOpen((prevState) => !prevState);
	};
	return (
		<Accordion className="mb-3">
			<Card className="p-4">
				<div className="d-flex align-items-center mb-3">
					<div>
						<h5>{title}</h5>
						<span className="text-secondary">{subTitle}</span>
					</div>
					{!open ? (
						<CustomAccordionToggle
							outline
							size="sm"
							variant="primary"
							eventKey="0"
							className="ms-auto"
							onClickFC={saveChange}
						>
							CHANGE
						</CustomAccordionToggle>
					) : (
						<>{rightBtn ? rightBtn : null}</>
					)}
				</div>
				<Accordion.Collapse eventKey="0">
					<>
						{children}
						<div className="d-flex">
							<CustomAccordionToggle
								variant="dark"
								eventKey="0"
								className="ms-auto px-5"
								onClickFC={saveChange}
							>
								Proceed
							</CustomAccordionToggle>
						</div>
					</>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

interface PropsType {
	title: string;
	subTitle?: string;
	rightBtn?: React.ReactNode;
	children?: ReactChild;
}
