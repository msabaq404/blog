<script lang="ts">
  import commentAPIURL from "@utils/comment-api-url";
  import { sanityClient } from "sanity:client";

  type Comment = {
    username: string;
    text: string;
    timestamp: string;
  };

  let { postId }: { postId: string } = $props();

  let comments = $state<Comment[]>([]);

  let isPosting = $state(false);

  let newComment = $state<Comment>({
    username: "",
    text: "",
    timestamp: "",
  });

  // Fetch comments for the post
  async function fetchComments() {
    try {
      const data: Comment[] = await sanityClient.fetch(
        `*[_type == "comment" && postId._ref == $postId] | order(timestamp desc) {
                    _id,
                    username,
                    text,
                    timestamp
                }`,
        { postId }
      );
      comments = data.map((comment) => ({
        ...comment,
        timestamp: new Date(comment.timestamp).toLocaleString(),
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  // Call fetchComments when component mounts
  fetchComments();

  async function addComment() {
    if (newComment.text.trim()) {
      const comment = {
        text: newComment.text.trim(),
        username: newComment.username.trim() || "Anonymous",
        postId: postId,
      };
      console.log(JSON.stringify(comment));

    try {
      isPosting = true;
      await fetch(`${commentAPIURL.replace(/\/$/, "")}/api/create`, {
        method: "POST",
        body: JSON.stringify(comment),
      });
      comments.unshift({
        ...comment,
        timestamp: new Date().toLocaleString(),
      });
      } catch (error) {
        console.error("Error posting comment:", error);
      } finally {
        isPosting = false;
        newComment.text = "";
      }
    }
  }
</script>

<div class="max-w-6xl mx-auto px-4">
  <h2 class="text-primary dark:text-background text-2xl font-semibold mb-2">Leave a comment ...</h2>

  <div
    class="mb-5 p-4 max-w-2xl border border-blue-400/30 dark:border-gray-700 rounded-lg bg-blue-50/20 dark:bg-blue-950/60 backdrop-blur-sm"
  >
    <input
      bind:value={newComment.username}
      placeholder="Your name..."
      class="w-full mb-2.5 border border-blue-500/30 dark:border-gray-700 dark:bg-blue-950/80 dark:text-background rounded p-2.5 font-sans bg-fig backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <textarea
      bind:value={newComment.text}
      placeholder="Write a comment..."
      rows="3"
      class="w-full border border-blue-500/30 dark:border-gray-700 dark:bg-blue-950/80 dark:text-background rounded p-2.5 resize-y font-sans bg-fig backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
    <button
      onclick={addComment}
      disabled={!newComment.text.trim()}
      class="mt-2.5 px-4 py-2 bg-blue-500/80 text-white dark:text-blue-600 dark:font-semibold dark:bg-gray-200 border-none rounded cursor-pointer backdrop-blur-sm hover:bg-blue-700/80 dark:hover:bg-white disabled:bg-gray-400/50 dark:disabled:bg-gray-400 dark:disabled:text-blue-800  disabled:cursor-not-allowed flex items-center gap-2"
    >
      {#if isPosting}
        <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
            fill="none"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      {/if}
      {isPosting ? "Posting..." : "Post Comment"}
    </button>
  </div>

  <h3 class="text-xl text-primary dark:text-background font-semibold mb-5">
    Comments ({comments.length})
  </h3>

  <div class="max-w-2xl">
    {#each comments as comment}
      <div
        class="bg-blue-50/20 backdrop-blur-sm mb-4 border border-blue-400/40 rounded-xl p-4
        dark:bg-blue-950/80 dark:border-gray-700"
      >
        <div class="flex justify-between items-center mb-3">
          <span class="font-semibold text-primary dark:text-background">{comment.username}</span>
          <span class="text-blue-700/70 dark:text-blue-100 text-sm">{comment.timestamp}</span>
        </div>
        <p class="text-gray-800/90 dark:text-white leading-relaxed">{comment.text}</p>
      </div>
    {/each}
  </div>
</div>
