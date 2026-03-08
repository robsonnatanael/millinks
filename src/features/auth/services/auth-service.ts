import { api } from "@/services/api";
import { LoginRequestProps, LoginResponseProps } from "../types";
import { isAxiosError } from "axios";
import Cookies from "js-cookie";
import { DEFAULT_VALUES } from "@/shared/utils/default-values";
import { logger } from "@/lib/logger";


export const loginRequest = async ({ email, password }: LoginRequestProps) => {

    const API_AUTH_URL = `${process.env.API_AUTH_URL}`;
    try {
        const response = await api.post<LoginResponseProps>(API_AUTH_URL, {
            identifier: email,
            password
        });

        Cookies.set(DEFAULT_VALUES.COOKIE_KEY, response.data.jwt);

        return response;
    } catch (error) {

        if (isAxiosError(error)) {
            const axiosError = error.response?.data?.error?.message;
            logger.error('Error message:', axiosError);
        }

        throw error;
    }
};

export const logoutRequest = () => {
    Cookies.remove(DEFAULT_VALUES.COOKIE_KEY);
};
