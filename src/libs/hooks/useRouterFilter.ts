import { useRouter } from 'next/router';

export const useRouterFilter = <T extends FilterType>(): ((val: T | T[]) => void) => {
	const router = useRouter();
	const { pathname, query } = router;

	return (param: T | T[]) => {
		const params = new URLSearchParams();

		for (const [key, urlValue] of Object.entries(query)) {
			if (Array.isArray(urlValue)) {
				urlValue.forEach((e) => {
					params.append(key, e);
				});
			} else {
				params.set(key, urlValue);
			}
		}

		if (Array.isArray(param)) {
			param.forEach(({ name, value }) => {
				if (value === null) {
					params.delete(name);
				} else if (Array.isArray(value)) {
					params.delete(name);
					value.forEach((e) => {
						params.append(name, e);
					});
				} else {
					params.set(name, String(value));
				}
			});
		} else {
			const { name, value } = param;
			if (value === null || value === '') {
				params.delete(name);
			} else if (Array.isArray(value)) {
				params.delete(name);
				value.forEach((e) => {
					params.append(name, e);
				});
			} else {
				params.set(name, String(value));
			}
		}

		router.push({ pathname, query: params.toString() }, undefined, { scroll: false });
	};
};

export interface FilterType<T extends string = string> {
	name: T;
	value: string | string[] | number | null | readonly string[];
}
