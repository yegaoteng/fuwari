<script lang="ts">
  import { url } from "../../utils/url-utils";

  interface Post {
    title: string;
    slug: string;
    updated?: string | Date;
    published: string | Date;
  }

  let { posts = [] } = $props<{ posts: Post[] }>();

  let daysRange = $state(7); // Default to 7 days as requested/shown in screenshot
  let filteredPosts = $state<Post[]>([]);

  const ranges = [1, 7, 14, 30];

  function getFilteredAndSortedPosts(allPosts: Post[], days: number): Post[] {
    const now = new Date();
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return allPosts
      .filter((post) => {
        if (!post.updated) return false;
        const updatedDate = new Date(post.updated);
        // Ensure valid date
        if (isNaN(updatedDate.getTime())) return false;
        return updatedDate >= cutoff;
      })
      .sort((a, b) => {
        // Handle optional updated property safely
        const dateA = a.updated ? new Date(a.updated) : new Date(0);
        const dateB = b.updated ? new Date(b.updated) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
  }

  $effect(() => {
    filteredPosts = getFilteredAndSortedPosts(posts, daysRange);
  });
</script>

<div class="flex flex-col gap-3">
  <!-- Time range selector -->
  <div class="flex flex-row gap-2">
    {#each ranges as range}
      <button
        class="px-3 py-1 text-xs rounded-lg transition-all duration-200 border {daysRange ===
        range
          ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-sm font-bold'
          : 'bg-transparent border-transparent text-neutral-500 hover:bg-[var(--btn-plain-bg-hover)] hover:text-[var(--primary)]'}"
        onclick={() => (daysRange = range)}
      >
        {range}天
      </button>
    {/each}
  </div>

  <!-- Posts list -->
  <div
    class="flex flex-col gap-2 max-h-[300px] overflow-y-auto"
    style="scrollbar-width: none; -ms-overflow-style: none;"
  >
    {#if filteredPosts.length > 0}
      {#each filteredPosts as post}
        <a
          href={url(`/posts/${post.slug}/`)}
          class="group flex flex-col gap-1 p-2.5 -mx-2 rounded-xl hover:bg-[var(--btn-plain-bg-hover)] transition-all duration-200"
        >
          <div
            class="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-relaxed"
          >
            {post.title}
          </div>
          <div
            class="flex items-center gap-2 text-xs text-neutral-400 group-hover:text-[var(--primary)]/70 transition-colors"
          >
            <div class="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div>
            <span
              >{new Date(
                post.updated || post.published
              ).toLocaleDateString()}</span
            >
          </div>
        </a>
      {/each}
    {:else}
      <div
        class="flex flex-col items-center justify-center py-6 text-neutral-400 gap-2"
      >
        <div class="text-xs">近 {daysRange} 天无更新</div>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Ensure no scrollbar shows even if inline styles fail */
  div::-webkit-scrollbar {
    display: none;
  }
</style>
