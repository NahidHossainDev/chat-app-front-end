import React, { FC, ReactNode } from 'react';
import { Accordion } from 'react-bootstrap';

export const CustomAccordion: FC<{ data: any; children: ReactNode }> = ({ data, children }) => {
	return (
		<Accordion>
			{data?.map(({ item, subItem }, i) => (
				<Accordion.Item key={i} eventKey={i.toString()}>
					<Accordion.Header>{item}</Accordion.Header>
					<Accordion.Body>{children}</Accordion.Body>
				</Accordion.Item>
			))}
		</Accordion>
	);
};
