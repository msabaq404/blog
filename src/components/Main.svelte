<script lang="ts">
  import { untrack } from "svelte";
  import Aside from "./Aside.svelte";
  import Categories from "./Categories.svelte";
  import { sanityClient } from "sanity:client";
  import { partialPostSubQuery } from "@utils/api";
  import Pagination from "./Pagination.svelte";
  import { setTheme } from "state.svelte";

  interface Post {
    title: string;
    slug: string;
    imgSrc: string;
    description: string;
    categories?: string[];
    author?: string;
    date?: string;
    tags?: string[];
  }

  let {
    posts,
    totalPosts,
    popularPosts,
    categories,
    currCategory = "all",
    currPage = 1,
  }: {
    posts: Post[];
    totalPosts: number;
    popularPosts: Post[];
    categories: string[];
    currCategory: string;
    currPage:number;
  } = $props();

  let view = $state<"category" | "tag">("category");

  // let currPage = $state(1);

  let totalViewPosts = $state(totalPosts);

  let tag = $state<string>("");

  let sliderOpen = $state(false);

  $effect(() => {
    (async () => {
      if (tag) {
        totalViewPosts = await sanityClient.fetch<number>(`
        count(*[_type == "post" && defined(slug) && "${tag}" in tags[]->slug.current])
      `);
      } else {
        totalViewPosts = await sanityClient.fetch<number>(`
        count(*[_type == "post" && defined(slug) 
          ${
            currCategory !== "all"
              ? `&& "${currCategory}" in categories[]->slug.current`
              : ""
          }
        ])
      `);
      }
    })();
  });

  $effect(() => {
    void currCategory;
    void tag;

    let postRange = [(currPage - 1) * 8, currPage * 8 - 1];
    console.log("Fetching posts for page:", currPage, "Range:", postRange);

    untrack(async () => {
      posts = await sanityClient.fetch<Post[]>(`
        *[_type == "post" && defined(slug)
         ${currCategory !== "all" ? `&& "${currCategory}" in categories[]->slug.current ` : ""}
         ${tag ? `&& "${tag}" in tags[]->slug.current` : ""}         
         ]
         | order(publishedAt desc){
          ${partialPostSubQuery}
        }[${postRange[0]}..${postRange[1]}] 
      `);
      console.log("Fetched posts:", posts);
    });
  });

  function onCategoryClick(selectedCategory: string) {
    view = "category";
    tag = "";
    currPage = 1;
    currCategory = selectedCategory;
  }

  function onTagClick(selectedTag: string) {
    view = "tag";
    currPage = 1;
    tag = selectedTag;
  }

  $effect(() => {
    void posts;
    void postsSectionWidth;
    let zigZag = document.querySelector(".zig-zag") as HTMLElement;
    let bodyHeight = document.querySelector(".wrapper")!.clientHeight;
    zigZag!.style.height = `${bodyHeight + 45}px`;
  });

  let postsSection = $state<HTMLElement | null>(null);
  let postsSectionWidth = $state<string | null>("");

  $effect(() => {
    function updateWidth() {
      postsSectionWidth = postsSection && -postsSection.clientWidth + "px";
      console.log("Posts section width:", postsSectionWidth);
    }

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  });

  
</script>

{#snippet articles(blog: Post, last: boolean)}
  <article
    class:mb-6={!last}
    class="relative z-10 flex flex-col sm:flex-row gap-3 cursor-pointer bg-gray-200/80 dark:bg-blue-950/80 backdrop-blur rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-blue-100 dark:border-gray-700"
  >
    {#if blog.imgSrc}
      <div class="size-18 shrink-0">
        <img
          src={blog.imgSrc}
          alt="Sample Blog"
          class="w-full h-18 object-cover rounded-lg"
        />
      </div>
    {/if}
    <div class="content flex-1">
      <a
        href={`/blog/post/${blog.slug}`}
        aria-label={`Read ${blog.title}`}
        class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 hover:text-primary transition-colors"
      >
        {blog.title}
      </a>
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {blog.description}
      </p>
      {#each blog.tags! as tag}
        <button
          type="button"
          aria-label={`View posts in #${tag}`}
          onclick={(e) => {
            e.preventDefault();
            onTagClick(tag.replaceAll(" ", "-").toLowerCase());
          }}
          class="flex items-center gap-4 mb-4"
        >
          <span
            class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold cursor-pointer hover:shadow-sm"
          >
            {tag}
          </span>
        </button>
      {/each}
      <div
        class="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2 text-gray-600 dark:text-gray-400"
      >
        <span class="text-sm">By {blog.author}</span>
        <span class="text-xs hidden sm:inline-block">•</span>
        <span class="text-xs">{new Date(blog.date!).toLocaleDateString()}</span>
      </div>
    </div>
  </article>
{/snippet}

<div id="posts"  class="max-w-screen flex overflow-x-clip px-4 py-3">
  <section
    class="grid shrink-0 w-full grid-cols-[minmax(0,1fr)_4rem] md:grid-cols-[minmax(0,2fr)_1fr] md:gap-4 max-w-6xl mx-auto
    transition-all duration-300"
  >
    <main
      bind:this={postsSection}
      class:translate-x-[-100%]={sliderOpen}
      class="max-w-full transition-transform duration-300 ease-in-out"
    >
      <Categories
        {onCategoryClick}
        {currCategory}
        {categories}
        className="sticky top-[7rem] z-50"
      />
      <div class="pt-3">
        {#if view === "category"}
          {#each posts as blog, index}
            {@render articles(blog, index == posts.length - 1)}
          {/each}
        {:else if view === "tag"}
          <h2
            class="flex items-center backdrop-blur relative z-10 text-4xl rounded-full font-mono cursor-pointer font-bold mb-4 p-2 bg-blue-800/20 w-fit text-blue-500"
          >
            #{tag}<button
              type="button"
              aria-label="Clear tag filter"
              onclick={() => {
                view = "category";
                tag = "";
              }}
              class="ml-2 bg-blue-800/20 text-sm rounded-full text-gray-200 py-1 px-2 hover:bg-blue-800/30 hover:text-white transition-colors duration-300"
              >x</button
            >
          </h2>
          {#each posts as blog, index}
            {@render articles(blog, index == posts.length - 1)}
          {/each}
        {/if}
        <Pagination
          bind:currentPage={currPage}
          totalPages={Math.ceil(totalViewPosts / 8)}
        />
      </div>
    </main>
    <Aside className="hidden md:flex" {popularPosts} />
    <button
      type="button"
      onclick={() => (sliderOpen = !sliderOpen)}
      style={sliderOpen ? `translate: ${postsSectionWidth}` : ``}
      class="md:hidden sticky top-[7rem] mr-3.5 justify-self-center h-[calc(100vh-7.75rem)] transition-all duration-300
      ease-in-out"
      aria-label="Brings the Aside Drawer"
    >
      <svg
        class:rotate-180={!sliderOpen}
        class="size-10 bg-gray-300/40 transition-all ease-in duration-200 rounded-full p-2 shadow-sm"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </section>

  <Aside
    className={(sliderOpen
      ? "translate-x-[-100%]"
      : "") +
      " flex md:hidden ml-[-1rem] w-[calc(100%-4rem)]  shrink-0  transition-all duration-300 ease-in-out"}
    {popularPosts}
  />
</div>
