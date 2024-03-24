<script lang="ts">
  import { rules } from "../lib/state.svelte";

  let {
    name,
    rule,
    example,
  }: {
    name: string;
    rule: "letters" | "numbers" | "spaces" | "symbols";
    example: string;
  } = $props();
</script>

<button
  class="m-1 w-full rounded-md border bg-gray-100 p-2 text-left shadow-md hover:bg-gray-200 {rules
    .rules[rule]
    ? 'border-green-400 shadow-green-300'
    : 'border-red-400 shadow-red-300'}"
  onclick={() => (rules.rules[rule] = !rules.rules[rule])}
>
  <div class="flex flex-row justify-between">
    <span class="text-lg font-semibold">{name}</span>
    <span
      class="size-7 rounded-full text-center font-black text-white {rules.rules[
        rule
      ]
        ? 'bg-green-600'
        : 'bg-red-600'}"
    >
      {#if rules.rules[rule]}
        &check;
      {:else}
        &cross;
      {/if}
    </span>
  </div>
  <div class="text-sm">Eksempler på gyldige tegn:</div>
  <div class="mx-auto w-fit bg-gray-200 p-1 text-center font-mono text-purple">
    {example}
  </div>
</button>
