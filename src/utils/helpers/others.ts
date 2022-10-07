export const scrollToBottom = (el) => {
	el?.scrollIntoView({ behavior: "smooth" });
};

export const fileNameShortener = (text: string, length: number = 10) => {
	const a = text.split(".");
	if (a[0].length > length + 3) {
		return `${a[0].slice(0, length)}...${a[1]}`;
	}
	return text;
};

export const nameShortener = (text: string, length: number = 13) => {
	if (text.length > length) {
		return `${text.slice(0, length)}...`;
	}
	return text;
};
