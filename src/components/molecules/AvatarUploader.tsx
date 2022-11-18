import { Avatar, Button, FormInput } from "@components/atoms";
import { useRef, useState } from "react";

export const AvatarUploader = ({ changeHandler, ...res }) => {
	const [avatarURL, setAvatarURL] = useState<string>(null);
	const avatarInpRef = useRef<HTMLInputElement>();

	const handleChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setAvatarURL(() => URL.createObjectURL(file));
			changeHandler(file);
		}
	};

	console.log(avatarInpRef);
	return (
		<div className='my-3'>
			<small className='text-secondary'>Optional</small>
			<div className='d-flex justify-content-between align-items-center '>
				<Button
					size='sm'
					variant='light'
					className='me-auto'
					type='button'
					onClick={() => document.getElementById("avatarInput").click()}
				>
					Choose Avatar
				</Button>
				<Avatar src={avatarURL} size='sm' />
				<FormInput
					hidden
					{...res}
					id='avatarInput'
					type='file'
					placeholder='Avatar'
					name='files'
					onChange={handleChange}
					ref={avatarInpRef}
				/>
			</div>
		</div>
	);
};
