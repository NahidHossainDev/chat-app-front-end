import { FormInput } from "@components/atoms";
import { all_API } from "@pages/api/allApi";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

export const Signup: FC = () => {
	const initailValues = { files: null, name: "", email: "", mobile: "", password: "" };
	const initailErrors = { files: "", name: "", email: "", mobile: "", password: "" };

	const [values, setValues] = useState<typeof initailErrors>(initailValues);
	const [errs, setErrs] = useState<typeof initailErrors>(initailErrors);

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// const payload = new FormData();
		// payload.append("name", values.name);
		// payload.append("email", values.email);
		// payload.append("password", values.password);
		// payload.append("mobile", values.mobile);
		// payload.append("files", values.files);

		try {
			const { success, data, message } = await all_API.authRegister(values);
			if (success) {
				setErrs(initailErrors);
				router.push(router.query?.redirect ? String(router.query.redirect) : "/login");
			} else {
				setErrs(initailErrors);
				setErrs((prevState) => {
					const err = initailErrors;
					for (const key in data?.errors) {
						console.log(key);
						err[key] = data?.errors[key].msg;
					}
					return err;
				});
			}
		} catch (err) {}
	};
	console.log(errs);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "file") {
			setValues((prevState) => ({ ...prevState, [name]: e.target.files[0] }));
		} else {
			setValues((prevState) => ({ ...prevState, [name]: value }));
		}
	};
	return (
		<Wrapper>
			<Form className=' m-auto p-4 rounded' onSubmit={handleSubmit}>
				<h5 className='text-center mb-3'>Create a new account</h5>
				<FormInput
					srOnly
					type='string'
					name='name'
					placeholder='Full Name'
					onChange={handleChange}
					value={values.name}
					message={errs.name}
					required
				/>
				<FormInput
					srOnly
					type='string'
					name='email'
					placeholder='Email'
					onChange={handleChange}
					value={values.email}
					message={errs.email}
					required
				/>
				<FormInput
					srOnly
					type='string'
					name='mobile'
					placeholder='Mobile number'
					onChange={handleChange}
					value={values.mobile}
					message={errs.mobile}
					required
				/>
				<FormInput
					srOnly
					type='string'
					name='password'
					placeholder='password'
					onChange={handleChange}
					value={values.password}
					message={errs.password}
					required
				/>
				<FormInput
					srOnly
					type='file'
					placeholder='Avatar'
					name='files'
					onChange={handleChange}
					message={errs.files}
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
