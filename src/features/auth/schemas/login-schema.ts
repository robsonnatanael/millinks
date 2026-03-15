import { z } from 'zod';
import { AUTH_MESSAGES } from '../utils/messages';

const schema = z.object({
  email: z.email({ message: AUTH_MESSAGES.EMAIL_INVALID }),
  password: z
    .string()
    .trim()
    .min(1, { message: AUTH_MESSAGES.PASSWORD_REQUIRED }),
});

type FormData = z.infer<typeof schema>;

export { schema, type FormData };
