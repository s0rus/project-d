<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data;
	$: ({ feed } = data);

	console.log(data);
</script>

<div class="container mx-auto flex h-full w-full flex-col items-center space-y-8 p-8">
	<form class="w-full" action="?/createTweet" method="post" use:enhance>
		<textarea class="textarea h-32 resize-none p-4" name="text" placeholder="What is up?" />
		<input type="hidden" name="authorId" value={$page.data.session?.user?.id} />
		<button class="btn variant-filled-primary" type="submit"> Tweet </button>
	</form>
	{#each feed as tweet}
		<div>
			<div class="flex items-start justify-start rounded-3xl p-2">
				<Avatar class="min-w-[64px]" src={tweet.author.image} />
				<div class="flex flex-col">
					<div>
						<span class="ml-4 break-words text-xl font-bold">
							{tweet.author.name}
						</span>
						<span class="text-l break-words text-gray-500">
							@{tweet.author.name} · {tweet.createdAt}
						</span>
					</div>
					<p class="ml-4 break-words text-xl">
						{tweet.text}
					</p>
				</div>
			</div>
		</div>
	{/each}
</div>
