/**
 * Check if mobile device
 * @param userAgent
 */
export const isMobileDevice = (userAgent: string): boolean => {
	const re =
		/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;

	if (userAgent) {
		return re.test(userAgent);
	} else {
		return false;
	}
};

/**
 * Check whether is number or string
 * @param value
 * @returns
 */
export const isNumber = (value: string): boolean => {
	return /^-?[\d.]+(?:e-?\d+)?$/.test(value);
};

/**
 * Check phone number is valid or NOT
 * @param number - pass phone number
 */
export const isPhoneNumber = (number: string): boolean => {
	const regex = /^((01){1}[3-9]{1}\d{8})$/;
	return regex.test(number);
};

/**
 * Check email address is valid or NOT
 * @param email
 * @returns
 */
export const isEmailAddress = (email: string): boolean => {
	const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/; // eslint-disable-line
	return regex.test(String(email).toLowerCase());
};

/**
 * Check if all properties is NULL
 * @param obj
 * @returns
 */
export const isNullProperties = (obj: Record<string, any>): boolean => {
	for (const key in obj) {
		if (obj[key] !== null && obj[key] !== "") return false;
	}
	return true;
};

export const formatStatus = (status: string): string => {
	return status
		.toLowerCase()
		.replace(/_/g, " ")
		.replace(/\b(\w)/g, (x) => x.toUpperCase());
};
