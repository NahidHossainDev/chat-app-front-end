import { MainLayout, SignupUnit } from "@components/templates";
import { NextPage } from "next";

const CreateAccount: NextPage = () => {
	return (
		<MainLayout>
			<SignupUnit />
		</MainLayout>
	);
};

export default CreateAccount;
