import { FC } from "react";
import { Container } from "react-bootstrap";

export const MainLayout: FC<PropsType> = ({ children }) => {
	return (
		<main>
			<Container fluid='xl'>{children}</Container>
		</main>
	);
};

interface PropsType {
	isMobile?: boolean;
	authUser?: any;
	children?: React.ReactNode;
}
