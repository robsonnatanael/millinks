export interface LoginRequestProps {
    email: string;
    password: string;
}

export interface LoginResponseProps {
    jwt: string;
    user: {
        id: number;
        documentId: string;
        username: string;
        email: string;
        provider: string;
        confirmed: boolean;
        blocked: boolean;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }
}
