import Link from "next/link";
import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

export const Login: FC = () => {
	return (
		<Wrapper>
			<Form className=' m-auto p-4 rounded'>
				<h5 className='text-center mb-3'>Log In</h5>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Control type='string' placeholder='Enter your email or phone number' />
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Control type='password' placeholder='Enter your password' />
				</Form.Group>
				<Button variant='primary' className='d-block px-5 mx-auto mb-4' type='submit'>
					Login
				</Button>
				<span className='d-block text-center'>
					<Link href='/create-account'>Create New Account</Link>
				</span>
			</Form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	form {
		max-width: 400px;
		min-width: 300px;
		background-color: #293b46;
		color: white;
	}
`;
