export interface RootState {
    id: number,
    authority: string;
    userId: string;
    username: string;
    authenticated: boolean;
    category:string;
    categories: string[];
}
export interface UserInfo {
    id: number;
    authenticated: boolean;
    userId: string;
    username: string;
    authority: string;
}

export interface Comment {
    id: number;
    content: string;
    user_id: string;
    username: string;
    created_at: string;
}

export interface Post{
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    username: string;
    userid: string;
    filename: string;
    fileId: number;
    category: string;
    views: number;
} 

export interface AuthResponse extends Response {
    id: number;
    userId: string;
    username: string;
    authority: string;
}

export interface LoginResponse extends Response {
    message?: string;
}

export interface GetPostResponse extends Response {

}

 
