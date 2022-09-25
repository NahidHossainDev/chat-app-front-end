import { FormInput } from "@components/atoms";
import { all_API } from "@libs/api/allApi";
import { isEmail, isNotEmpty, isPhoneNumber, passValidation, useNewForm } from "@libs/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

export const Signup: FC = () => {
	const initailValues = {
		files: { value: null, message: "", validate: [] },
		name: { value: "", message: "", validate: [isNotEmpty] },
		email: { value: "", message: "", validate: [isNotEmpty, isEmail] },
		mobile: { value: "", message: "", validate: [isNotEmpty, isPhoneNumber] },
		password: { value: "", message: "", validate: [isNotEmpty, passValidation] },
	};
	const [file, setFile] = useState(null);

	const router = useRouter();

	const onSubmitHandler = async () => {
		const payload = new FormData();
		payload.append(`file`, file);
		for (const key in values) {
			payload.append(`${key}`, values[key]);
		}

		try {
			const { success, data, message } = await all_API.authRegister(payload);
			if (success) {
				router.push(router.query?.redirect ? String(router.query.redirect) : "/login");
			} else {
				setErrors((prevState) => {
					const err = { ...prevState };
					for (const key in data?.errors) {
						err[key] = data?.errors[key].msg;
					}
					return err;
				});
			}
		} catch (err) {}
	};

	const { values, errors, handleChange, handleSubmit, setErrors } = useNewForm(initailValues, onSubmitHandler);
	return (
		<Wrapper>
			<Form noValidate className=' m-auto p-4 rounded' onSubmit={handleSubmit}>
				<h5 className='text-center mb-3'>Create a new account</h5>
				<FormInput
					srOnly
					type='string'
					name='name'
					placeholder='Full Name'
					onChange={handleChange}
					value={values.name}
					message={errors.name}
					required
				/>
				<FormInput
					srOnly
					type='string'
					name='email'
					placeholder='Email'
					onChange={handleChange}
					value={values.email}
					message={errors.email}
					required
				/>
				<FormInput
					srOnly
					type='string'
					name='mobile'
					placeholder='Mobile number'
					onChange={handleChange}
					value={values.mobile}
					message={errors.mobile}
					required
				/>
				<FormInput
					srOnly
					type='string'
					name='password'
					placeholder='password'
					onChange={handleChange}
					value={values.password}
					message={errors.password}
					required
				/>
				<FormInput
					srOnly
					type='file'
					placeholder='Avatar'
					name='files'
					onChange={(e) => setFile(e.target.files[0])}
					message={errors.files}
				/>

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
