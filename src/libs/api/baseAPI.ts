import { NextPageContext } from "next";
import { parseCookies } from "nookies";

export class BaseAPI {
	protected baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	private token(ctx?: NextPageContext) {
		const { token = null } = parseCookies(ctx);
		return token;
	}

	protected async get<T>(url: string, ctx?: NextPageContext): Promise<T> {
		const res = await fetch(`${this.baseURL}/${url}`, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
				Authorization: this.token(ctx),
			},
		});

		return await res.json();
	}

	protected async post<T>(url: string, payload: unknown, ctx?: NextPageContext): Promise<T> {
		const res = await fetch(`${this.baseURL}/${url}`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
				Authorization: this.token(ctx),
			},
			body: JSON.stringify(payload),
		});

		return await res.json();
	}

	protected async put<T>(url: string, payload: unknown, ctx?: NextPageContext): Promise<T> {
		const res = await fetch(`${this.baseURL}/${url}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
				Authorization: this.token(ctx),
			},
			body: JSON.stringify(payload),
		});

		return await res.json();
	}

	protected async delete<T>(url: string, payload: unknown, ctx?: NextPageContext): Promise<T> {
		const res = await fetch(`${this.baseURL}/${url}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
				Authorization: this.token(ctx),
			},
			body: JSON.stringify(payload),
		});

		return await res.json();
	}

	protected async formData<T>(url: string, payload: FormData, ctx?: NextPageContext): Promise<T> {
		const res = await fetch(`${this.baseURL}/${url}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: this.token(ctx),
			},
			body: payload,
		});

		return await res.json();
	}
}
