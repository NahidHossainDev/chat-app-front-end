import { FormInput } from "@components/atoms";
import { LoadingBtn } from "@components/molecules";
import { AvatarUploader } from "@components/molecules/AvatarUploader";
import { all_API } from "@libs/api/allApi";
import { isEmail, isNotEmpty, passValidation, useNewForm } from "@libs/hooks";
import { setAuthUser } from "@store/user/user.action";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const initailValues = {
	files: { value: null, message: "", validate: [] },
	name: { value: "", message: "", validate: [isNotEmpty] },
	email: { value: "", message: "", validate: [isNotEmpty, isEmail] },
	// mobile: { value: "", message: "", validate: [isNotEmpty, isPhoneNumber] },
	password: { value: "", message: "", validate: [isNotEmpty, passValidation] },
};

export const Signup: FC = () => {
	const [file, setFile] = useState<File>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter();

	const onSubmitHandler = async () => {
		setLoading(true);
		const payload = new FormData();
		payload.append(`file`, file);
		for (const key in values) {
			payload.append(`${key}`, values[key]);
		}

		try {
			const { success, data, message } = await all_API.authRegister(payload);
			if (success) {
				setAuthUser(data);
				router.push(router.query?.redirect ? String(router.query.redirect) : "/");
			} else {
				setErrors((prevState) => {
					const err = { ...prevState };
					for (const key in data?.errors) {
						err[key] = data?.errors[key].msg;
					}
					return err;
				});
			}
		} catch (err) {
		} finally {
			setLoading(false);
		}
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
				{/* <FormInput
					srOnly
					type='string'
					name='mobile'
					placeholder='Mobile number'
					onChange={handleChange}
					value={values.mobile}
					message={errors.mobile}
					required
				/> */}
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
				{/* <small className='text-secondary'>Optional</small> */}
				{/* <FormInput
					srOnly
					type='file'
					placeholder='Avatar'
					name='files'
					onChange={(e) => setFile(e.target.files[0])}
					message={errors.files}
				/> */}

				<AvatarUploader changeHandler={setFile} />

				<LoadingBtn isLoading={loading} variant='primary' className='d-block px-5 mx-auto mb-4' type='submit'>
					Create Account
				</LoadingBtn>

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
