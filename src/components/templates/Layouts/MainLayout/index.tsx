import { FC } from "react";
import { Container } from "react-bootstrap";

export const MainLayout: FC<PropsType> = ({ children }) => {
    return (
        <Container>
            <main>{children}</main>
        </Container>
    );
};

interface PropsType {
    isMobile?: boolean;
    authUser?: any;
    children?: React.ReactNode;
}
