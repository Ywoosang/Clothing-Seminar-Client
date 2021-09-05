export interface RootState {
    authority: string;
    userId: string;
    username: string;
    authenticated: boolean;
    requestUrl: string;
    category:string;
    categories: string[];
}
export interface UserInfo {
    authenticated: boolean;
    userId: string;
    username: string;
    authority: string;
}

export interface AuthResponse extends Response {
    userId: string;
    username: string;
    authority: string;
}

export interface LoginResponse extends Response {
    message?: string;
}

export interface Post{
    title: string;
    content: string;
    created_at: string;
    username: string,
    filename: string,
    fileId: number,
    category: string
  }
 

