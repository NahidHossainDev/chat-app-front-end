import Link from "next/link";
import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

export const Signup: FC = () => {
	return (
		<Wrapper>
			<Form className=' m-auto p-4 rounded'>
				<h5 className='text-center mb-3'>Create a new account</h5>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Control type='string' name='ame' placeholder='Full Name' required />
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Control type='string' name='email' placeholder='Email' required />
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Control type='string' name='mobile' placeholder='Mobile number' required />
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Control type='string' name='password' placeholder='password' required />
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Control type='file' placeholder='Avatar' name='file' />
				</Form.Group>

				<Button variant='primary' className='d-block px-5 mx-auto mb-4' type='submit'>
					Create Account
				</Button>

				<span className='d-block text-center'>
					<Link href='/login'>Go to login</Link>
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
