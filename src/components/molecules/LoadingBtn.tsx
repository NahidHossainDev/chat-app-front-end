import { Button, ButtonProps } from "@components/atoms";
import { FC } from "react";
import { Spinner } from "react-bootstrap";

export const LoadingBtn: FC<PropsType> = ({ isLoading, children, ...res }) => {
	return (
		<Button disabled={isLoading} {...res}>
			{isLoading ? <Spinner animation='border' /> : children}
		</Button>
	);
};

interface PropsType extends ButtonProps {
	isLoading: boolean;
}
