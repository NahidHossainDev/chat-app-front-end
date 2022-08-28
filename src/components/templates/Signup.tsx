import { FormInput } from "@components/atoms";
import { all_API } from "@pages/api/allApi";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

export const Signup: FC = () => {
	const initailErrors = { file: "", name: "", email: "", mobile: "", password: "" };
	const [errs, setErrs] = useState<typeof initailErrors>(initailErrors);

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = new FormData(e.target);
		try {
			const { success, data, message } = await all_API.authRegister(payload);
			if (success) {
				setErrs(initailErrors);
				router.push(router.query?.redirect ? String(router.query.redirect) : "/login");
			} else {
				setErrs(initailErrors);
				setErrs((prevState) => {
					const err = initailErrors;
					for (const key in data?.errors) {
						if (Object.prototype.hasOwnProperty(key)) {
							err[key] = data?.errors[key];
						}
					}
					return err;
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	// const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	const { name, value } = e.target;
	// 	setValues((prevState) => ({ ...prevState, [name]: value }));
	// };
	return (
		<Wrapper>
			<Form className=' m-auto p-4 rounded' onSubmit={handleSubmit}>
				<h5 className='text-center mb-3'>Create a new account</h5>
				<FormInput srOnly type='string' name='name' placeholder='Full Name' message={errs.name} required />
				<FormInput srOnly type='string' name='email' placeholder='Email' message={errs.email} required />
				<FormInput
					srOnly
					type='string'
					name='mobile'
					placeholder='Mobile number'
					message={errs.mobile}
					required
				/>
				<FormInput
					srOnly
					type='string'
					name='password'
					placeholder='password'
					message={errs.password}
					required
				/>
				<FormInput srOnly type='file' placeholder='Avatar' name='file' message={errs.file} />

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
