import { z } from 'zod';

const schema = z.object({
  email: z.email({ message: 'Email inválido' }),
  password: z.string().trim().min(1, { message: 'Campo obrigatório' }),
});

type FormData = z.infer<typeof schema>;

export { schema, type FormData };
