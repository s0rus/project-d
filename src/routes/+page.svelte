<script>
	import BasicAuth from '$lib/BasicAuth.svelte';
</script>

<header class="bg-surface-900 py-2 text-white">
	<div class="container mx-auto flex items-center justify-between">
		<h1 class="text-2xl font-bold">Project-D</h1>
		<BasicAuth />
	</div>
</header>

<main class=" container mx-auto flex items-start justify-between bg-surface-700 py-8 px-4">
	<aside class="flex w-1/4 justify-start ">left</aside>
	<aside class="flex w-3/4 justify-center">Main content</aside>
	<aside class="flex w-1/4 justify-end">right</aside>
</main>

<footer class=" py-4 text-white">
	<div class="container mx-auto text-slate-700 ">
		&copy; {new Date().getFullYear()} Project-D
	</div>
</footer>
