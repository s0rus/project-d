import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/core/providers/discord';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';

if (!DISCORD_CLIENT_ID) {
	throw new Error('Missing DISCORD_CLIENT_ID in .env');
}

if (!DISCORD_CLIENT_SECRET) {
	throw new Error('Missing DISCORD_CLIENT_SECRET in .env');
}

export const handle = (async (...args) => {
	return SvelteKitAuth({
		trustHost: true,
		providers: [
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			Discord({
				clientId: DISCORD_CLIENT_ID,
				clientSecret: DISCORD_CLIENT_SECRET
			})
		]
	})(...args);
}) satisfies Handle;
