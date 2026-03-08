'use client'

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { loginRequest } from "../services/auth-service";
import { LoginRequestProps } from "../types";
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

export const useLoginMutation = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: ({ email, password }: LoginRequestProps) =>
            loginRequest({
                email,
                password
            }),
        onSuccess: (response) => {

            if (response?.status === 200) {
                router.push('/dashboard');
            }
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const message = error.response?.data?.error?.message || 'Erro ao realizar login';
                toast.error(message);
            } else {
                toast.error('Ocorreu um erro inesperado');
            }
        }
    });

    return {
        mutation
    }

}
