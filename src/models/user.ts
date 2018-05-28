export interface User {
    email: string;
    password: string;
}

export interface UserRegister {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface UserLoged {
    name: string;
    email: string;
    password: string;
}