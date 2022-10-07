import styled, { css } from "styled-components";
import { AvatarProps } from ".";
import { Image } from "../Image";

export const AavatarWrapper = styled(Image)<AvatarProps>`
	border-radius: 50%;
	position: relative;
	object-fit: cover;

	${({ size }) => {
		switch (size) {
			case "xs":
				return css`
					width: 2rem;
					height: 2rem;
				`;

			case "sm":
				return css`
					width: 2.8rem;
					height: 2.8rem;
				`;
			case "md":
				return css`
					width: 4rem;
					height: 4rem;
				`;

			case "lg":
				return css`
					width: 6.25rem;
					height: 6.25rem;
				`;
			case "xl":
				return css`
					width: 18.75rem;
					height: 18.75rem;
				`;
		}
	}}
`;
