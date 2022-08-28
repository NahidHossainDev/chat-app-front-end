export interface IAuth {
	id: string;
	name: string;
	mobile: string;
	email: string;
	role: string;
	token?: string;
}

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

export interface ICreateAcc {
	errors?: ICreateAccErrors;
}
