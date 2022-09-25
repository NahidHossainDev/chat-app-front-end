export const isNotEmpty = (name: string, value: string): string | undefined => {
	if (value.trim().length < 1) return `${formatValidatorKey(name)} is required`;
};

export const isMinLength = (length = 3) => {
	return (name: string, value: string): string | undefined => {
		if (value.trim().length < length)
			return `${formatValidatorKey(name)} should be at least ${length} characters long`;
	};
};

export const isEmail = (name: string, email: string): string | undefined => {
	const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/; // eslint-disable-line
	const isValid = regex.test(String(email).toLowerCase());
	if (!isValid) return "Email address is invalid";
};

export const passValidation = (name: string, value: string): string | undefined => {
	const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; // eslint-disable-line
	// const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // eslint-disable-line
	const isValid = regex.test(value);
	if (!isValid) return "Password needs minimum eight characters, at least one letter and one number";
};

export const isPhoneNumber = (name: string, value: string): string | undefined => {
	const regex = /^(\+88|0088)?((01){1}[3-9]{1}\d{8})$/;
	const isPhoneValid = regex.test(value);
	if (!isPhoneValid) return "Invalid Phone Number";
};

export const isNullProperties = (obj: Record<string, any>): boolean => {
	for (const key in obj) {
		if (obj[key] !== null && obj[key] !== "") return false;
	}
	return true;
};

export const formatValidatorKey = (value: string): string => {
	const val = value.replace(/([A-Z])/g, " $1");
	return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
};
