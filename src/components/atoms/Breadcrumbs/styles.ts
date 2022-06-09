import styled from 'styled-components';

export const BreadcrumbWrapper = styled.div`
	width: 100%;
	display: block;
	margin: 0.725rem 0;

	ul {
		margin: 0;
		padding: 0;

		li {
			list-style: none;
			display: inline-block;
			position: relative;

			span,
			a {
				color: #999999;
				font-size: 0.85rem;
			}

			& + li {
				margin-left: 1rem;

				&:before {
					content: '';
					position: absolute;
					top: 0.35rem;
					left: -0.9rem;
					width: 0.875rem;
					height: 0.875rem;
					background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z' fill='rgba(153,153,153,1)'/%3E%3C/svg%3E");
				}
			}
		}
	}
`;
