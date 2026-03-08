'use client'

import { useRouter } from "next/navigation";
import { logoutRequest } from "../services/auth-service";

export const useLogout = () => {
    const router = useRouter();

    const logout = () => {
        logoutRequest();
        router.push("/login");
    };

    return {
        logout,
    };
};
