import { z } from 'zod';
import * as environment from '$env/static/private';

export const ServerConfigSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']),
	AUTH_SECRET: z.string().trim().min(32),
	DISCORD_CLIENT_ID: z.string().trim().min(1),
	DISCORD_CLIENT_SECRET: z.string().trim().min(1),
	DATABASE_URL: z.string().trim().min(1).url(),
	SKIP_ENV_VALIDATION: z.enum(['true', 'false'])
});

export type ServerConfigSchema = z.infer<typeof ServerConfigSchema>;

export const config = ServerConfigSchema.parse(environment);
