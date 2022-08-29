import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import styled from "styled-components";

const ENDPOINT = "localhost:5000";
// const socket = io(ENDPOINT);

export const HomePage: FC = () => {
	const [text, setText] = useState<string>("");
	const [message, setMessage] = useState<Object[]>([]);

	useEffect(() => {
		// socket.on("connect", () => {});

		return () => {
			// socket.emit("disconnect");
			// socket.off();
		};
	}, []);

	// useEffect(() => {
	//     socket.on("message", (msg) => {
	//         console.log(msg);
	//         setMessage([...message, msg]);
	//     });
	// }, [message]);

	const sendMessage = (msg: string) => {
		// socket.emit("send_message", text, () => setText(""));
		setText("");
	};

	const router = useRouter();
	return (
		<Wrapper>
			<Row className='h-100'>
				<Col xs={3} className='h-100'>
					<div className='all-friends-container'>
						<Card className='px-3 py-1 my-2'>
							<p className='mb-0'>Name</p>
							<span className='text-secondary'>343254356</span>
						</Card>
					</div>

					<Card className='create-new-chat ' role='button'>
						Create New Chat
					</Card>
				</Col>
				<Col xs={9} className='msg-box'>
					<div className='text-container'>
						<div className='w-100'>
							<div className='me'>
								<span className='me-text position-relative'>
									<div id='triangle-top-right'></div>Hi this is me!
								</span>
							</div>
							<div className='oponent'>
								<span className='oponent-text position-relative'>
									<div id='triangle-top-left'></div>
									Hi this is me! <br />
									adfadfa <br /> adfadf <br /> adfad
									<br /> adfadf <br />
									dfadfa
								</span>
							</div>
						</div>
					</div>
					<footer>
						<input
							type='text'
							placeholder='Enter your message'
							value={text}
							onChange={(e) => setText(e.target.value)}
							onKeyDown={(e) => {
								e.key === "Enter" ? sendMessage(text) : null;
							}}
						/>
						<Button onClick={() => router.push("/login")} type='button'>
							go to home
						</Button>
					</footer>
				</Col>
			</Row>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	height: 100vh;

	.all-friends-container {
		height: calc(100vh - 80px);
	}

	.card,
	.msg-box {
		color: #fdf1db;
		background-color: #222e35;
	}

	.create-new-chat {
		background-color: #016956;
		padding: 1rem;
		border-radius: 0.4rem;
		text-align: center;
	}

	.msg-box {
		.text-container {
			height: calc(100vh - 85px);
			display: flex;
			width: 100%;
			align-items: flex-end;
			padding: 0 3rem;
			.oponent {
				.oponent-text {
					padding: 6px 10px;
					border-radius: 10px;
					background-color: #394e5a;
					border-top-left-radius: 0;
					max-width: 70%;
				}

				#triangle-top-left {
					width: 0;
					height: 0;
					display: inline;
					border-top: 11px solid #394e5a;
					border-left: 10px solid transparent;
					position: absolute;
					left: -7px;
					top: 0;
				}
			}
			.me {
				text-align: end;

				.me-text {
					padding: 10px;
					border-radius: 10px;
					border-top-right-radius: 0;
					background-color: #039474;
					position: relative;
					max-width: 70%;
				}
				#triangle-top-right {
					width: 0;
					height: 0;
					display: inline;
					border-top: 11px solid #039474;
					border-right: 10px solid transparent;
					position: absolute;
					right: -7px;
					top: 0;
				}
			}
			span {
				display: inline-block;
				margin: 0.6rem 0;
			}
		}

		footer {
			background-color: #30414b;
			padding: 20px;
			width: 100%;

			input {
				background-color: #2a3942;
				border: none;
				padding: 10px 20px;
				border-radius: 10px;
				min-width: 50%;
				color: white;
			}
		}
	}
`;
