import type { Session } from '@auth/core/types';
import type {
	Session as OGSession,
	DefaultSession
} from '@auth/sveltekit/node_modules/@auth/core/types';
import { SvelteKitAuthConfig as OGSvelteKitAuthConfig } from '@auth/sveltekit';
import { CustomAdapter } from '$lib/prisma/client';
import type { PrismaClient } from '@prisma/client';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session;
		}
		// interface PageData {}
		// interface Platform {}
	}
	// eslint-disable-next-line no-var
	var prisma: PrismaClient;
}

// TODO: update when they fix this:
// https://github.com/nextauthjs/next-auth/issues/6640#issuecomment-1426801813
declare module '@auth/sveltekit/node_modules/@auth/core/types' {
	interface Session extends OGSession {
		user?: {
			id: string;
		} & DefaultSession['user'];
	}
}

declare module '@sveltejs/kit' {
	interface Redirect extends Error {
		status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308;
		location: string;
	}
}

declare module '@auth/sveltekit' {
	interface SvelteKitAuthConfig extends OGSvelteKitAuthConfig {
		adapter: CustomAdapter;
	}
}

export {};
