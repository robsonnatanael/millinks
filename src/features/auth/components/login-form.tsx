'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { FC } from 'react';
import { useLoginForm } from '../hooks/use-login-form';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';

export const LoginForm: FC = (className, ...props) => {
  const { errors, isValid, handleSubmit, onSubmit, register } = useLoginForm();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register('email')}
                  autoComplete="username"
                />
                {errors.email && (
                  <FieldDescription className="text-red-500">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register('password')}
                  autoComplete="current-password"
                />
                {errors.password && (
                  <FieldDescription className="text-red-500">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={!isValid}>
                  Entrar
                </Button>
                <FieldDescription className="text-center">
                  Não tem uma conta? <a href="#">Cadastre-se</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
