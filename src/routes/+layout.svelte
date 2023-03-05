<script>
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div class="container mx-auto h-screen w-screen px-8">
	<main class="h-full">
		<AppShell slotSidebarLeft="w-56 p-4">
			<svelte:fragment slot="sidebarLeft">
				<nav class="list-nav h-full">
					<ul class="flex h-full flex-col justify-between">
						<div>
							<li class="text-xl font-bold"><a href="/">Home</a></li>
							<li class="text-xl font-bold"><a href="/about">Profile</a></li>
						</div>
						<div>
							<li>
								<div class="flex w-full flex-col justify-start">
									{#if $page.data.session}
										<div class="flex items-center justify-start rounded-3xl p-2 hover:bg-red-900">
											{#if $page.data.session?.user?.image}
												<Avatar class="min-w-[24px]" src={$page.data.session?.user?.image} />
											{/if}
											<div class="flex flex-col">
												<span class="ml-4 break-words text-xl font-bold">
													{$page.data.session.user?.name ?? ''}
												</span>
												<span class="text-l ml-4 break-words text-gray-500">
													@{$page.data.session.user?.name ?? ''}
												</span>
											</div>
										</div>
										<button
											on:click={() => signOut()}
											class="btn variant-filled-primary mt-4 w-full">Sign out</button
										>
									{:else}
										<span class="text-center text-2xl font-bold">You are not signed in.</span>
										<button
											on:click={() => signIn('discord')}
											class="btn variant-filled-primary mt-4 w-full">Sign In with Discord</button
										>
									{/if}
								</div>
							</li>
						</div>
					</ul>
				</nav>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<slot />
			</svelte:fragment>
		</AppShell>
	</main>
</div>
