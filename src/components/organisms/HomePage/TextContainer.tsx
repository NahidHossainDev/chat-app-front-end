import { updateSeenUnSeen } from "@store/message/message.action";
import { getUnseenMessages, selectMessagesIDs } from "@store/message/message.slice";
import { scrollToBottom } from "@utils/helpers";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleText from "./SingleText";

export const TextContainer = () => {
	const messageIDs = useSelector(selectMessagesIDs);
	const unseenMsg = useSelector(getUnseenMessages);
	const lastMsg = useRef(null);

	const dispatch = useDispatch();

	useEffect(() => {
		if (unseenMsg) {
			updateSeenUnSeen(unseenMsg, "SEEN", dispatch);
		}
		if (lastMsg) scrollToBottom(lastMsg.current);
	}, [messageIDs, unseenMsg]);

	return (
		<div className='Text_Container VerticalScroller'>
			<div className='w-100 '>
				{messageIDs?.length > 0
					? messageIDs.map((el, i) => {
							return <SingleText key={i} messageId={el} nextMsgId={messageIDs[i + 1]} />;
					  })
					: null}
			</div>
			<div ref={lastMsg} id='lastMst' />
		</div>
	);
};
