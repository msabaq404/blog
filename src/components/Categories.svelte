<!-- <script>
    let arr = ["Programming", "Web Development", "Data Science", "Machine Learning", "Tutorials",
        "Programming", "Web Development", "Data Science", "Machine Learning", "Tutorials"
    ];

    let colors = [
        "bg-blue-400/50 backdrop-blur-sm border border-blue-300/40",
        "bg-indigo-400/50 backdrop-blur-sm border border-indigo-300/35",
        "bg-purple-400/50 backdrop-blur-sm border border-purple-300/35",
        "bg-teal-400/30 backdrop-blur-sm border border-teal-300/40"
    ];
</script> -->

<script>
  import { onMount } from "svelte";


  // let arr = ["Programming", "Web Development", "Data Science", "Machine Learning", "Tutorials", "JavaScript", "Python", "React", "Svelte", "Node.js", "CSS", "HTML", "TypeScript", "Docker", "Git"];

  let colors = [
    "bg-blue-400/50 backdrop-blur-sm border border-blue-300/40",
    "bg-indigo-400/50 backdrop-blur-sm border border-indigo-300/35",
    "bg-purple-400/50 backdrop-blur-sm border border-purple-300/35",
    "bg-teal-400/30 backdrop-blur-sm border border-teal-300/40",
    
  ];

  let { className, categories, onCategoryClick, currCategory = "" } = $props();

  let lastColorIndex = -1;

  function getColor() {
   
    let colorIndex = Math.floor(Math.random() * colors.length);
    
    if (colorIndex === lastColorIndex) {

      return getColor();
    } else {
      lastColorIndex = colorIndex;
      return colors[colorIndex];
    }
  }

  let scrollContainer;
  let isMouseDown = false;
  let startX;
  let scrollLeft;

  function handleMouseDown(e) {
    isMouseDown = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    scrollContainer.style.cursor = "grabbing";
  }

  function handleMouseMove(e) {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollLeft - walk;
  }

  function handleMouseUp() {
    isMouseDown = false;
    scrollContainer.style.cursor = "grab";
  }
  function makeTabActive(target) {
    target.parentElement.querySelectorAll("a").forEach((item) => {
      item.classList.remove(
        "outline-3",
        "outline-blue-800",
        "outline-offset-3"
      );
    });
    target.classList.add(
      "outline-3",
      "outline-blue-800",
      "outline-offset-3"
    );
  }

  let allTab;

  onMount(() => {

    document.querySelectorAll(".category-item").forEach((item) => {
      if (item.id === currCategory) {
        makeTabActive(item);
      }
    });
    
  });


</script>

<div
  bind:this={scrollContainer}
  class="scrollable w-full bg-blue-300/20 h-16 flex items-center px-2 rounded-lg backdrop-blur overflow-x-auto cursor-grab active:cursor-grabbing  {className}"
  role="button"
  tabindex="0"
  aria-label="Category list"
  onmousedown={handleMouseDown}
  onmousemove={handleMouseMove}
  onmouseup={handleMouseUp}
  onmouseleave={handleMouseUp}
>
  <a
    bind:this={allTab}
    id="all"
    href={`/blog/`}
    aria-label={`View all posts`}
    onclick={(e) => {
      e.preventDefault();
      makeTabActive(e.target);
      onCategoryClick("all");
    }}
    class="category-item h-10 mx-2 px-3 min-w-[6rem] outline-3 outline-blue-800 outline-offset-3 shadow-lg cursor-pointer bg-emerald-400/50 backdrop-blur-sm border border-emerald-300/40 flex items-center rounded-lg  font-semibold text-white text-shadow-xs transition-colors shrink-0 select-none dark:outline-background"
  >
    All
  </a>
  {#each categories as category}
    <a
      id={category.replaceAll(" ", "-").toLowerCase()}
      href={`/blog/category/${category.replaceAll(" ", "-").toLowerCase()}`}
      aria-label={`View posts in ${category} category`}
      onclick={(e) => {
        e.preventDefault();
        makeTabActive(e.target);
        onCategoryClick(category.replaceAll(" ", "-").toLowerCase());
      }}
      class="category-item h-10 mx-2 px-3 min-w-[6rem] shadow-lg cursor-pointer flex items-center rounded-lg {getColor()} dark:outline-background font-semibold text-white text-shadow-xs transition-colors shrink-0 select-none"
    >
      {category}
    </a>
  {/each}
</div>

<style>
  .scrollable::-webkit-scrollbar {
    height: 0px;
  }

  .scrollable::-webkit-scrollbar-track {
    background: rgba(147, 197, 253, 0.2);
    border-radius: 4px;
  }

  .scrollable::-webkit-scrollbar-thumb {
    background: rgba(96, 165, 250, 0.5);
    border-radius: 4px;
  }

  .scrollable::-webkit-scrollbar-thumb:hover {
    background: rgba(96, 165, 250, 0.7);
  }
</style>
