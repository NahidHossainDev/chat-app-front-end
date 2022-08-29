import { all_API } from "@pages/api/allApi";
import { setAuthUser } from "@store/user/user.action";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

export const Login: FC = () => {
	const initialValues = { username: "", password: "" };
	const [values, setValues] = useState<typeof initialValues>(initialValues);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (values.password && values.username) {
			const { password, username } = values;
			try {
				const { success, data, message } = await all_API.authSignin(username, password);
				if (success) {
					setAuthUser(data);
					router.push(router.query?.redirect ? String(router.query.redirect) : "/");
				}
			} catch (err) {}
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<Wrapper>
			<Form className=' m-auto p-4 rounded' onSubmit={handleSubmit}>
				<h5 className='text-center mb-3'>Log In</h5>
				<Form.Group className='mb-3'>
					<Form.Control
						type='string'
						name='username'
						placeholder='Enter your email or phone number'
						value={values.username}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='password'
						name='password'
						placeholder='Enter your password'
						value={values.password}
						onChange={handleChange}
					/>
				</Form.Group>
				<Button variant='primary' type='submit' className='d-block px-5 mx-auto mb-4'>
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
