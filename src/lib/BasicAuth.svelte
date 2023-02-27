<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div class="card flex flex-col py-6 px-8">
	{#if $page.data.session}
		<div class=" flex items-center justify-center">
			{#if $page.data.session?.user?.image}
				<Avatar src={$page.data.session?.user?.image} />
			{/if}
			<div class="flex flex-col">
				<span class="ml-2 text-2xl">
					{$page.data.session.user?.name ?? ''}
				</span>
				<span class="ml-2 text-sm font-normal text-primary-700"
					>{$page.data.session.user?.email}</span
				>
			</div>
		</div>
		<button on:click={() => signOut()} class="btn variant-filled-primary mt-2 w-full"
			>Sign out</button
		>
	{:else}
		<span class="text-center text-2xl font-bold">You are not signed in.</span>
		<button on:click={() => signIn('discord')} class="btn variant-filled-primary mt-4 w-full"
			>Sign in with Discord</button
		>
	{/if}
</div>
