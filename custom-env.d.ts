import { NextPageContext as NPC } from 'next';

declare module 'next/dist/shared/lib/utils' {
	interface NextPageContext extends NPC {
		authUser?: IAuth;
	}
}
