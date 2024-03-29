import store, { wrapper } from "@store";
import { updateIsMobile } from "@store/app/app.slice";
import { authSignIn } from "@store/user/user.slice";
import { isMobileDevice } from "@utils/helpers";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import NProgress from "nprogress";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../public/scss/app.scss";
import { all_API } from "../libs/api/allApi";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		NProgress.configure({ showSpinner: true });
		router.events.on("routeChangeStart", () => NProgress.start());
		router.events.on("routeChangeComplete", () => NProgress.done());
		router.events.on("routeChangeError", () => NProgress.done());
		if (pageProps?.authUser) {
			const { token, ...rest } = pageProps.authUser;
			if (token) {
				dispatch(authSignIn(rest));
			}
		}
		dispatch(updateIsMobile(pageProps?.isMobile));
	}, []);
	return (
		<>
			<Component {...pageProps} />
			<ToastContainer position='bottom-right' autoClose={4000} />
		</>
	);
}

MyApp.getInitialProps = async (appContext: ICustomNextAppContext) => {
	const { ctx } = appContext;
	ctx.isMobile = isMobileDevice(ctx?.req?.headers?.["user-agent"]);
	const cookies = parseCookies(ctx);
	if (ctx?.req) {
		if (cookies?.token) {
			try {
				const { success, data } = await all_API.validateAuth(ctx);
				if (success) {
					ctx.authUser = data;
				}
			} catch (err) {}
		}
	} else if (typeof window !== "undefined") {
		const { user, appState } = store.getState();
		ctx.isMobile = appState.isMobile;
		if (user.isAuthenticate) {
			const data = { ...user, token: cookies.token };
			ctx.authUser = data;
		}
	}

	const appProps = await App.getInitialProps({ ...appContext });
	appProps.pageProps = {
		...appProps.pageProps,
		authUser: ctx.authUser,
		isMobile: ctx.isMobile,
	};
	return appProps;
};

export default wrapper?.withRedux(MyApp);

export interface ICustomNextAppContext extends AppContext {
	ctx: any;
}
