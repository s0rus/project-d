import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/core/providers/discord';
import { config } from '$lib/config.server';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '$lib/server/prisma';

const handleAuth = (async (...args) => {
	const [{ event }] = args;
	return SvelteKitAuth({
		trustHost: true,
		adapter: PrismaAdapter(prisma),
		providers: [
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			Discord({
				clientId: config.DISCORD_CLIENT_ID,
				clientSecret: config.DISCORD_CLIENT_SECRET
			})
		],
		callbacks: {
			async session({ session, user }) {
				session.user = {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image
				};
				event.locals.session = session;
				return session;
			}
		}
	})(...args);
}) satisfies Handle;

const protectedHandle = (async ({ event, resolve }) => {
	await event.locals.getSession();
	if (!event.locals.session && event.route.id?.includes('protected')) {
		throw redirect(302, '/');
	}
	return resolve(event);
}) satisfies Handle;

export const handle = sequence(handleAuth, protectedHandle);
