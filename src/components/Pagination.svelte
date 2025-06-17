<script>
    let { currentPage = $bindable(1), totalPages = 8 } = $props();
    
    let visiblePages = $derived.by(() => {
        if (totalPages <= 4) {
            return Array.from({length: totalPages}, (_, i) => i + 1);
        }
        
        if (currentPage <= 2) {
            return [1, 2, 3, '...', totalPages];
        }
        
        if (currentPage >= totalPages - 1) {
            return [1, '...', totalPages - 2, totalPages - 1, totalPages];
        }
        
        return [1, '...', currentPage, '...', totalPages];
    });
</script>

<div class="relative flex items-center justify-center gap-2 py-6 z-10">
    <button
        aria-label="Previous Page"
        class="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 border border-slate-600/50 text-white hover:bg-slate-800 hover:border-slate-700/60 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
        disabled={currentPage === 1}
        onclick={() => currentPage--}
    >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
    </button>

    <div class="flex items-center gap-1">
        {#each visiblePages as page}
            {#if page === '...'}
                <span class="flex items-center justify-center w-10 h-10 text-gray-500/70 dark:text-gray-200/70">...</span>
            {:else}
                <button
                    class="flex items-center justify-center w-10 h-10 rounded-full font-medium text-sm transition-all duration-300 
                    {currentPage === page
                        ? 'bg-blue-500/30 backdrop-blur-md text-blue-800 dark:text-background border border-blue-400/50 shadow-lg shadow-blue-500/20 transform scale-105'
                        : 'bg-white/20 backdrop-blur-md text-gray-700 border dark:text-gray-300 border-white/30 hover:bg-white/30 hover:border-white/40 hover:text-gray-800 shadow-lg hover:shadow-xl hover:scale-102'}"
                    onclick={() => (currentPage = page)}
                >
                    {page}
                </button>
            {/if}
        {/each}
    </div>

    <button
        aria-label="Next Page"
        class="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 border border-slate-600/50 text-white hover:bg-slate-800 hover:border-slate-700/60 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
        disabled={currentPage === totalPages}
        onclick={() => ++currentPage}
    >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
    </button>
</div>
