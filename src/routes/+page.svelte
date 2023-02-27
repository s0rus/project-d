<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
	import RandomComponent from '$lib/Component.svelte';
</script>

<div
	class="container mx-auto flex h-full w-full flex-col items-center justify-center space-y-8 p-8"
>
	<h1>Project D.</h1>
	<p>Good luck and have fun!</p>

	<RandomComponent />

	<div class="card flex flex-col py-6 px-8">
		{#if $page.data.session}
			<div class="flex items-center justify-center">
				{#if $page.data.session?.user?.image}
					<Avatar src={$page.data.session?.user?.image} />
				{/if}
				<span class="ml-4 text-2xl font-bold">
					{$page.data.session.user?.name ?? ''}
				</span>
			</div>
			<button on:click={() => signOut()} class="btn variant-filled-primary mt-4 w-full"
				>Sign out</button
			>
		{:else}
			<span class="text-center text-2xl font-bold">You are not signed in.</span>
			<button on:click={() => signIn('discord')} class="btn variant-filled-primary mt-4 w-full"
				>Sign In with Discord</button
			>
		{/if}
	</div>
</div>
