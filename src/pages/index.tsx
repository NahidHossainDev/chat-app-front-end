import { withAuth } from "@libs/hoc";
import type { NextPage } from "next";
import { HomePageUnit, MainLayout } from "../components/templates";

const Home: NextPage = () => {
	return (
		<MainLayout>
			<HomePageUnit />
		</MainLayout>
	);
};

export default withAuth(Home);
