import { FileItem } from "@components/molecules";
import store, { AppState } from "@store";
import { selectMessageByID } from "@store/message.slice";
import { getUserState } from "@store/user/user.slice";
import { useSelector } from "react-redux";
import styled from "styled-components";

const SingleText = ({ messageId, nextMsgId, lastMsg }) => {
	const user = useSelector(getUserState);
	const el = useSelector((state: AppState) => selectMessageByID(state, messageId));

	const mySelf = el.sender?.id === user?.id;
	let seen = false;

	// show (seen) only if both conditions are true.
	//  "isSeen" === true, and if this is the last message of mySelf.
	if (mySelf && el?.isSeen) {
		if (nextMsgId) {
			const nextMsg = selectMessageByID(store.getState(), nextMsgId);
			if (nextMsg?.sender.id === user?.id && !nextMsg.isSeen) seen = true;
		} else {
			seen = true;
		}
	}

	return (
		<TextWrapper className={`${mySelf ? "text-end" : ""}`}>
			<span className={` text-viwer ${mySelf ? "me" : "oponent"}-text position-relative `}>
				<div id={`triangle-top-${mySelf ? "right" : "left"}`}></div>
				{el.text}
				<div>
					{el.attachment?.map((el) => (
						<FileItem isMessageView {...el} key={el.gDriveID} />
					))}
				</div>
			</span>
			{seen && <div className='text-success'>(seen)</div>}
			<div ref={lastMsg} />
		</TextWrapper>
	);
};

export default SingleText;

const TextWrapper = styled.div`
	.text-viwer {
		display: inline-block;
		margin-top: 0.8rem;
	}
	.me-text {
		padding: 6px 10px;
		border-radius: 7px;
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

	.oponent-text {
		padding: 6px 10px;
		border-radius: 7px;
		background-color: #395566;
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
`;
