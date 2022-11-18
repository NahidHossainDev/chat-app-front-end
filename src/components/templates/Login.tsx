import { FormInput } from "@components/atoms";
import { LoadingBtn } from "@components/molecules";
import { all_API } from "@libs/api/allApi";
import { IAuth } from "@libs/api/interface";
import { isNotEmpty, useNewForm } from "@libs/hooks";
import Icon, { google } from "@libs/icons";
import { setAuthUser } from "@store/user/user.action";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const initailValues = {
	username: { value: "", message: "", validate: [isNotEmpty] },
	password: { value: "", message: "", validate: [isNotEmpty] },
	common: { value: "", message: "" },
};
const initialLoading = { google: false, login: false };

export const Login: FC<{ data?: IAuth }> = ({ data }) => {
	const [loading, setloading] = useState<typeof initialLoading>(initialLoading);
	const router = useRouter();

	useEffect(() => {
		if (data) {
			setAuthUser(data);
			router.push(router.query?.redirect ? String(router.query.redirect) : "/");
		}
	}, []);

	const onSubmitHandler = async () => {
		if (values.password && values.username) {
			const { password, username } = values;
			try {
				setloading((prev) => ({ ...prev, login: true }));
				const { success, data, message } = await all_API.authSignin(username, password);
				if (success) {
					setAuthUser(data);
					router.push(router.query?.redirect ? String(router.query.redirect) : "/");
				} else {
					setErrors((preErr) => {
						const err = { ...preErr };
						for (const key in data?.errors) {
							err[key] = data?.errors[key].msg;
						}
						return err;
					});
					setTimeout(() => setErrors({ common: "", username: "", password: "" }), 3000);
				}
			} catch (err) {
			} finally {
				setloading((prev) => ({ ...prev, login: false }));
			}
		}
	};

	const handleGoogleAuthURL = async () => {
		try {
			setloading((prev) => ({ ...prev, google: true }));
			const { success, data, message } = await all_API.getGoogleAuthURL();
			if (success) {
				// window.open(data.authURL, "_blank", "height=600,width=400");
				router.push(data.authURL);
			}
		} catch (error) {
			setloading((prev) => ({ ...prev, google: false }));
		}
	};

	const { values, errors, handleChange, handleSubmit, setErrors } = useNewForm(initailValues, onSubmitHandler);
	return (
		<Wrapper>
			<Form className=' m-auto p-4 rounded' onSubmit={handleSubmit}>
				<h5 className='text-center mb-3'>Log In</h5>

				<FormInput
					rounded
					srOnly
					type='string'
					name='username'
					className='mb-3'
					placeholder='Enter your email or phone number'
					value={values.username}
					onChange={handleChange}
					message={errors.username}
					required
				/>

				<FormInput
					rounded
					srOnly
					className='mb-2'
					type='password'
					name='password'
					placeholder='Enter your password'
					value={values.password}
					onChange={handleChange}
					message={errors.password}
					required
				/>
				{errors.common && (
					<p className='mb-0 text-danger text-center'>
						<small>{errors.common}</small>
					</p>
				)}

				<LoadingBtn
					isLoading={loading.login}
					variant='primary'
					type='submit'
					className='d-block px-5 mx-auto mb-4 mt-3'
				>
					Login
				</LoadingBtn>

				<LoadingBtn
					isLoading={loading.google}
					variant='primary'
					type='button'
					className='d-block px-3 mx-auto mb-4 mt-3'
					onClick={handleGoogleAuthURL}
				>
					<Icon path={google} fill='white' height={20} width={20} /> Google Login
				</LoadingBtn>

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
		max-width: 500px;
		min-width: 300px;
		background-color: #293b46;
		color: white;
	}
`;
