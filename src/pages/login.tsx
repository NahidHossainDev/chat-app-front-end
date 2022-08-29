import { LoginUnit, MainLayout } from "@components/templates";
import { withoutAuth } from "@libs/hoc";
import { NextPage } from "next";

const Login: NextPage = () => {
	return (
		<MainLayout>
			<LoginUnit />
		</MainLayout>
	);
};

export default withoutAuth(Login);
