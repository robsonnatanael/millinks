'use client';

import { useForm } from 'react-hook-form';
import { FormData, schema } from '../schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from './use-login-mutation';
import { LoginRequestProps } from '../types';

export const useLoginForm = () => {
  const { mutation } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ email, password }: LoginRequestProps) => {
    mutation.mutate({ email, password });
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
  };
};
