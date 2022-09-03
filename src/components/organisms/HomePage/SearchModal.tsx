import { Avatar } from "@components/atoms";
import { IconInput } from "@components/molecules";
import { all_API } from "@libs/api/allApi";
import { IConversationList, ISearchUserData } from "@libs/api/interface/user";
import { useDebounced } from "@libs/hooks/useDebounce";
import Icon, { close, search } from "@libs/icons";
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";

export const SearchModal: FC<PropsType> = ({ show, setShow, getConversations, setSelectedConversation }) => {
	const initialValues = { user: "" };
	const [values, setValues] = useState<typeof initialValues>(initialValues);
	const [searchRes, setSearchRes] = useState<ISearchUserData["users"]>([]);

	const getSearchUsers = async () => {
		if (values.user) {
			try {
				const { success, data, message } = await all_API.searchUser(values);
				if (success) {
					setSearchRes((prev) => [...data.users]);
				}
			} catch (err) {}
		}
	};

	const addNewConversation = async (data: ISearchUserData["users"][0]) => {
		const payload = { ...data, id: data._id };
		delete payload._id;
		try {
			const { success, data, message } = await all_API.addNewConversation(payload);
			if (success) {
				getConversations();
				setSelectedConversation(data);
				setShow(false);
			}
		} catch (err) {}
	};

	useDebounced(
		() => {
			getSearchUsers();
		},
		400,
		[values]
	);

	useEffect((): any => {
		setValues(initialValues);
		setSearchRes([]);
	}, [show]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<ModalWrapper show={show} onHide={() => setShow(false)}>
			<Modal.Header>
				<h5 className='mb-0 d-flex w-100'>
					Search Person
					<span className='ms-auto' role='button' onClick={() => setShow(!show)}>
						<Icon path={close} fill='#fff' />
					</span>
				</h5>
			</Modal.Header>
			<Modal.Body>
				<IconInput
					bgGray
					srOnly
					rounded
					iconPosition='end'
					className='mb-0'
					icon={search}
					name='user'
					value={values.user}
					placeholder='Search by name, mobile or email'
					onChange={handleChange}
				/>
				{values.user &&
					(searchRes.length > 0 ? (
						<ul className='p-0'>
							{searchRes.map((el, i) => (
								<Item key={i} onClick={() => addNewConversation(el)}>
									{el?.avatar && <Avatar className='me-3' src={el.avatar} size='xs' />}
									{el?.name}
								</Item>
							))}
						</ul>
					) : (
						<Item className='text-danger text-center' aria-disabled='true'>
							No data found!
						</Item>
					))}
			</Modal.Body>
		</ModalWrapper>
	);
};

const ModalWrapper = styled(Modal)`
	.modal-content {
		background-color: #222e35;
		color: white;
		min-height: 15rem;
		.modal-header {
			padding-bottom: 0;
			border-bottom: none;
		}
	}
`;

interface PropsType {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
	getConversations: () => Promise<void>;
	setSelectedConversation: Dispatch<SetStateAction<IConversationList>>;
}

const Item = styled.li`
	list-style: none;
	padding: 0.7rem 1.1rem;
	border-bottom: 1px solid lightgray;
	background-color: #32444e;

	&:not([aria-disabled]):hover {
		/* hover effect won't work with [aria-disabled] property */
		cursor: pointer;
		background-color: #466474;
	}
`;
