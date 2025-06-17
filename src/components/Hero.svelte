<script>
  import { getTheme, setTheme } from "state.svelte";
  import { fade } from "svelte/transition";

</script>

<section
  class="hero relative h-[calc(100vh-7rem)] max-w-6xl px-4 mx-auto flex flex-col-reverse justify-center sm:flex-row items-center sm:justify-between"
>
  <div class="hero-content flex flex-col justify-center mt-16 sm:mt-0">
    <h1 class="hero-title font-playfair text-5xl text-primary font-bold dark:text-background">
      Learn with<br />Zanda
    </h1>
    <a
      href="#posts"
      class="h-14 z-1 w-13 bg-primary text-background dark:text-primary dark:bg-background rounded-full flex justify-center items-center shadow-lg mt-4"
      aria-label="Down Arrow Key"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
        />
      </svg>
    </a>
  </div>
  <!-- <div class="zig-zag absolute w-1 h-full left-[55%] top-[-7.2rem] opacity-65"> -->
  <div class="zig-zag absolute overflow-y-clip right-[45%] top-[-7.2rem] opacity-65 text-[#5F8497] dark:text-background">
    <svg
      width="1664"
      height="2933"
      viewBox="0 0 1664 2933"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="object-contain"
    >
      <path
        d="M1660 2L1404.36 442.55C1401.75 447.045 1406.89 452.043 1411.31 449.316L1523.69 380.078C1528.15 377.33 1533.29 382.418 1530.6 386.908L4 2930"
        stroke="currentColor"
        stroke-width="8"
      />
    </svg>
    
  </div>
  <div class="hero-image max-w-3xl z-[-1] sm:flex-1">

   {#if typeof document !== "undefined" && setTheme(document.documentElement.getAttribute("data-theme"))} 
    {#if getTheme()  === "light" }
    <img
      src="/blog/hero.webp"
      in:fade={{duration: 300}}
      alt="A man reading book in a mountainous setting"
    />
    {:else}
    <img
      in:fade={{duration: 300}}
      src="/blog/hero-dark.webp"
      alt="A man reading book in a mountainous setting"
    />
    {/if}
  {:else}
  <img
      src="/blog/hero.webp"
      in:fade={{duration: 300}}
      alt="A man reading book in a mountainous setting"
      class="block dark:hidden"
    />
    <img
      in:fade={{duration: 300}}
      src="/blog/hero-dark.webp"
      alt="A man reading book in a mountainous setting"
      class="dark:block hidden"
    />
  {/if}
  </div>
</section>

