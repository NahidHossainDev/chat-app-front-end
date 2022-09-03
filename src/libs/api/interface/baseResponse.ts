export interface BR<T> {
	success: boolean;
	data: T;
	message?: string | string[];
}
