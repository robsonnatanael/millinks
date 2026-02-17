export interface AuthResponse {
    jwt: string,
    user: {
        id: number,
        documentId: string,
        username: string,
        email: string,
        provider: string,
        confirmed: boolean,
        blocked: boolean,
        createdAt: string,
        updatedAt: string,
        publishedAt: string
    }
}

export interface ApiError {
    data: null,
    error: {
        status: number,
        name: string,
        message: string,
        details: {}
    }
}

interface LinktreeData {
    id: number,
    documentId: string,
    title: string,
    url: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    is_active: boolean | null
}

export interface Linktree {
    data: LinktreeData[],
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
}