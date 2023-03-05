import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const fetchFeed = async () => {
		const feed = await prisma.tweet.findMany({
			include: {
				author: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		console.log(feed);

		return feed;
	};

	return {
		feed: await fetchFeed()
	};
};

export const actions: Actions = {
	createTweet: async ({ request }) => {
		const { text, authorId } = Object.fromEntries(await request.formData()) as {
			text: string;
			authorId: string;
		};

		try {
			await prisma.tweet.create({
				data: {
					text,
					authorId
				}
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Something went wrong' });
		}

		return {
			status: 201
		};
	}
};
