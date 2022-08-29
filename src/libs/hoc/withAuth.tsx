import { NextPageContext } from "next";
import Router from "next/router";

const getRedirectURL = (ctx: NextPageContext): string => {
	if (ctx?.pathname !== "/login") {
		const params = new URLSearchParams();
		params.append("redirect", process.env.publicURL + ctx.asPath);
		return `/login?${params.toString()}`;
	}
	return "/login";
};

const checkAuth = (ctx: NextPageContext) => {
	const { authUser } = ctx;
	if (authUser && authUser.token) return { auth: true };
	return { auth: false };
};

const withAuth = (WrappedComponent: any) => {
	const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

	hocComponent.getInitialProps = async (ctx: NextPageContext) => {
		const userAuth = checkAuth(ctx);
		const redirectURL = getRedirectURL(ctx);

		if (!userAuth?.auth) {
			if (ctx.res) {
				ctx.res.writeHead(302, { location: redirectURL });
				ctx.res.end();
			} else {
				Router.push(redirectURL);
			}
		} else if (WrappedComponent.getInitialProps) {
			const wrappedProps = await WrappedComponent.getInitialProps({ ...ctx, userAuth });
			return { ...wrappedProps, userAuth };
		}

		return { userAuth };
	};

	return hocComponent;
};

export default withAuth;
