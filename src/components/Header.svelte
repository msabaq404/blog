<script lang="ts">
  import { elasticOut } from "svelte/easing";
  import { getTheme, toggleTheme } from "../../state.svelte";


 

  function spin(_node: SVGElement, { duration }: { duration: number }) {
    return {
      duration,
      css: (t: number) => {
        const eased = elasticOut(t);

        return `transform: scale(${eased}) rotate(${eased * 360}deg);`;
      },
    };
  }
</script>

<header
  class="sticky h-14 mt-10 mb-4 mx-auto top-10 w-[min(95%,64rem)] bg-blue-300/20  backdrop-blur-md z-50 flex items-center justify-between px-4 py-2 rounded-full shadow-sm"
>
  <a href="/blog" class="branding flex items-center h-full ">
    <img src="/blog/Universe.webp" alt="Logo" class="h-full dark:contrast-150 dark:invert" />
    <h1 class="font-bold text-xl ml-1 text-primary dark:text-background">Zanda</h1>
  </a>
  <div class="flex justify-center items-center h-full">
    <button
      type="button"
      class="dark-mode-toggle h-[67%] cursor-pointer dark:text-background"
      aria-label="Toggle Dark Mode"
      onclick={() => toggleTheme()}
    >
      {#if getTheme() === "light"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.2"
          stroke="currentColor"
          class="moon size-10 h-full"
          in:spin={{ duration: 500 }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="sun size-10 h-full"
          in:spin={{ duration: 500 }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      {/if}
    </button>
  </div>
</header>