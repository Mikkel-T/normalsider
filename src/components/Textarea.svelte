<script lang="ts">
  import { text } from "../lib/state.svelte";
</script>

<textarea
  class="mx-auto mb-2 mt-2 block h-60 w-full resize-y rounded-lg border border-gray-200 p-2 shadow-lg focus:outline-none dark:bg-zinc-800"
  bind:value={text.text}
  id="textinput"
></textarea>
