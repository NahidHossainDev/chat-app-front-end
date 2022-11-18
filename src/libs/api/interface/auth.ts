interface IErr {
	value: string;
	msg: string;
	param: string;
	location: string;
}

interface ICreateAccErrors {
	email?: IErr;
	mobile?: IErr;
	name?: IErr;
	password?: IErr;
	file?: IErr;
}

interface INewUser {
	id: string;
	avatar: string;
	name: string;
	// mobile?: string;
	email: string;
	role: string;
	token: string;
	googleID?: string;
}

export interface ICreateAcc extends INewUser {
	errors?: ICreateAccErrors;
}

interface ILoginErr {
	common?: IErr;
	username?: IErr;
	password?: IErr;
}

export interface IAuth extends INewUser {
	errors?: ILoginErr;
}
