import { all_API } from "@libs/api/allApi";
import { IConversationList } from "@libs/api/interface/user";
import { withAuth } from "@libs/hoc";
import { updateAllConversation } from "@store/conversations";
import type { NextPage, NextPageContext } from "next";
import { useDispatch } from "react-redux";
import { HomePageUnit, MainLayout } from "../components/templates";

const Home: NextPage<PropsType> = ({ data }) => {
	const dispatch = useDispatch();
	dispatch(updateAllConversation(data));

	return (
		<MainLayout>
			<HomePageUnit />
		</MainLayout>
	);
};

Home.getInitialProps = async (ctx: NextPageContext) => {
	try {
		const { success, data, message } = await all_API.getAllConversation(ctx);
		if (success) {
			return { data };
		}
	} catch (err) {
		return { data: null };
	}
};

export default withAuth(Home);

interface PropsType {
	data: IConversationList[];
}
