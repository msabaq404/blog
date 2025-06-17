<script>
  import { sanityClient } from "sanity:client";
  import { untrack } from "svelte";

  let { popularPosts, className = "" } = $props();

  let isSearching = $state(false);


  let searchResults = $state([]);

  let searchValue = $state("");

  $effect(() => {
    void searchValue;

    untrack(() => {
      (async () => {
        if (!searchValue.trim()) {
          searchResults.length = 0;
          searchResults = [];
          return;
        }

        let results = await sanityClient.fetch(
          `*[_type == "post" && title match $search] | order(publishedAt desc) {
              _id,
              title,
              "slug": slug.current,
              description
            }`,
          { search: `*${searchValue}*` }
        );
        searchResults = results;
      })();
    });
  });
</script>

{#snippet listItem(item, search = false)}
  <a href="/blog/post/{item.slug}">
    <article
      class="group grid grid-cols-[3rem_1fr] gap-1 py-3 mb-2 bg-gray-300/40 dark:bg-blue-950/80  text-primary dark:text-gray-200 dark:border-1 dark:border-gray-700 rounded-md cursor-pointer"
    >
      {#if search}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 place-self-center"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 place-self-center"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
          />
        </svg>
      {/if}
      <h3 class="text-lg font-semibold">{item.title}</h3>
      <div
        class="col-start-2 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] text-sm text-gray-600 dark:text-gray-200 transition-all duration-300"
      >
        <span class="overflow-hidden">{item.description}</span>
      </div>
    </article>
  </a>
{/snippet}

<aside class="sticky top-[7rem] h-[calc(100vh-7.75rem)] flex flex-col gap-3
 {className}">
  <div
    class:flex-1={isSearching}
    onfocusin={() => (isSearching = true)}
    onblur={() => (isSearching = false)}
    class="h-16 flex flex-col overflow-clip justify-start text-primary px-4 rounded-lg bg-blue-300/20 dark:text-gray-200 backdrop-blur gap-2 transition-[flex] duration-300"
  >
    <div class="sticky top-0">
      <div class="flex h-14 items-center gap-2 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          bind:value={searchValue}
          placeholder="Search..."
          class="w-full p-2 border-primary dark:border-background border-b focus:outline-none focus:border-blue-500 focus:border-b-2 transition-colors"
        />
      </div>
    </div>

    {#if searchValue && searchResults.length > 0}
      <h2 class="font-bold text-lg mb-1">Search Results</h2>
    {/if}

    <div class="overflow-y-auto h-max">
      {#each searchResults as result}
        {@render listItem(result, true)}
      {/each}
      {#if searchValue && searchResults.length === 0}
        <p class="text-gray-500 dark:text-gray-200">No results found</p>
      {/if}
    </div>
  </div>

  <div
    class:flex-1={!isSearching}
    class:grid-rows-[auto_1fr]={!isSearching}
    class="overflow-y-hidden bg-gray-200 dark:bg-blue-950/80 dark:border-gray-700 dark:border-1 backdrop-blur px-3 pb-2 rounded-lg grid grid-rows-[auto_0fr] transition-[flex] duration-300"
  >
    <h2
      class="block font-bold sticky top-0 pt-2 pb-1 text-2xl mb-2 text-primary dark:text-background"
    >
      Popular Posts
    </h2>
    <div class="overflow-y-auto transition-[grid-template-rows] duration-300">
      {#each popularPosts as popularPost}
        {@render listItem(popularPost)}
      {/each}
    </div>
  </div>

  <div class="bg-gray-300/80 dark:bg-blue-950/80 dark:border-1 dark:border-gray-700 backdrop-blur px-3 py-2 rounded-lg">
    <h2 class="font-bold text-2xl mb-1 text-primary dark:text-background">Follow Us</h2>
    <div class="flex gap-3 justify-center">
      <!-- YouTube -->
      <a
        href="#"
        class="group flex items-center justify-center p-3 bg-gray-300/40 dark:bg-blue-950/80  text-primary rounded-md hover:bg-red-500/20 dark:hover:bg-red-500/40 hover:scale-110 transition-scale cursor-pointer"
        aria-label="Follow us on YouTube"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="size-6 text-red-600"
        >
          <path
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
          />
        </svg>
      </a>

      <!-- Facebook -->
      <a
        href="#"
        class="group flex items-center justify-center p-3 bg-gray-300/40 dark:bg-blue-950/80 text-primary rounded-md hover:bg-blue-500/20 dark:hover:bg-blue-500/30 hover:scale-110 transition-scale cursor-pointer"
        aria-label="Follow us on Facebook"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="size-6 text-blue-600"
        >
          <path
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>
      </a>

      <!-- GitHub -->
      <a
        href="#"
        class="group flex items-center justify-center p-3 bg-gray-300/40 dark:bg-blue-950/80 text-primary rounded-md hover:bg-gray-500/20 dark:hover:bg-gray-200/20 hover:scale-110 transition-scale cursor-pointer"
        aria-label="Follow us on GitHub"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="size-6 text-gray-700 dark:text-gray-300"
        >
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
      </a>
    </div>
  </div>
</aside>

<style>
  /* .overflow-y-scroll {
      scrollbar-width: thin;
      scrollbar-color: rgba(59, 130, 246, 0.6) rgba(156, 163, 175, 0.2);
    } */

  .overflow-y-auto::-webkit-scrollbar {
    width: 4px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(156, 163, 175, 0.2);
    border-radius: 4px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.6);
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(59, 130, 246, 0.8);
  }
</style>