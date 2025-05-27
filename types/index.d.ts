export interface IExpense {
    id: string;
    name: string;
    amount: string;
    description: string;
    createdAt: string;
}

export interface ICreateExpenseData {
    name: string;
    amount: string;
    description: string;
}

export interface IUser {
    id: string;
    username: string;
    password: string;
}

export interface IPost {
    id: string;
    userId: number;
    title: string;
    body: string;
}

export interface IComment {
    id: string;
    postId: string;
    body: string;
}

export interface ICreatePostData {
    userId: number;
    title: string;
    body: string;
}