import { config } from '$lib/config.server';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient, type User } from '@prisma/client';
import type { Adapter, AdapterAccount, AdapterSession } from 'next-auth/adapters';

const prisma = global.prisma || new PrismaClient();

if (config.NODE_ENV === 'development') {
	global.prisma = prisma;
}

export { prisma };

type OGAdapter = Omit<
	Adapter,
	'getUser' | 'getUserByEmail' | 'getUserByAccount' | 'getSessionAndUser'
>;

export interface CustomAdapter extends OGAdapter {
	getUser(id: string): Promise<User | null>;
	getUserByEmail(email: string): Promise<User | null>;
	getUserByAccount(
		providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>
	): Promise<User | null>;
	getSessionAndUser(sessionToken: string): Promise<{
		session: AdapterSession;
		user: User;
	} | null>;
}

export default function CustomPrismaAdapter(client: PrismaClient): CustomAdapter {
	return {
		...PrismaAdapter(client),
		async getUser(id: string) {
			return client.user.findUnique({
				where: { id }
			});
		},
		async getUserByEmail(email: string) {
			return client.user.findUnique({
				where: { email }
			});
		},
		async getUserByAccount(
			providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>
		) {
			const account = await client.account.findUnique({
				where: { provider_providerAccountId: providerAccountId },
				select: {
					user: true
				}
			});
			return account?.user ?? null;
		},
		async getSessionAndUser(sessionToken: string) {
			const userAndSession = await client.session.findUnique({
				where: { sessionToken },
				include: {
					user: true
				}
			});

			if (!userAndSession) return null;

			const { user, ...session } = userAndSession;
			return { user, session };
		}
	};
}
