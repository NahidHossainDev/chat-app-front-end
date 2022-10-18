import { LoginUnit, MainLayout } from "@components/templates";
import { all_API } from "@libs/api/allApi";
import { IAuth } from "@libs/api/interface";
import { withoutAuth } from "@libs/hoc";
import { NextPage, NextPageContext } from "next";

const Login: NextPage<{ data: IAuth; code: any }> = ({ data, code }) => {
	return (
		<MainLayout>
			<LoginUnit data={data} />
		</MainLayout>
	);
};

Login.getInitialProps = async (ctx: NextPageContext) => {
	const { code } = ctx.query;
	if (code) {
		try {
			const { success, data, message } = await all_API.getGoogleUser(code.toString());
			if (success) {
				return { data, code };
			}
		} catch (err) {
			return { data: null, code: ctx.query };
		}
	}
};
export default withoutAuth(Login);
