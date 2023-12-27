<script lang="ts">
  import {
    countText,
    prettyPrintRules,
    ruleDefaults,
    textPages,
  } from "../lib/rules";
  import { text } from "../lib/state.svelte";
</script>

<div class="flex w-full flex-col sm:flex-row">
  {#each ruleDefaults as rule}
    <div class="mb-5 w-full text-center">
      <div class="mb-4 text-2xl font-bold text-purple underline">
        {rule.name}
      </div>
      <div>Antal normalsider</div>
      <div class="text-6xl font-bold text-purple">
        {textPages(text.text, rule.rules).toFixed(2)}
      </div>
      <div>{countText(text.text, rule.rules)} talte tegn</div>
      <div class="mx-auto w-1/2 text-sm text-gray-800">
        1 normalside: {prettyPrintRules(rule.rules)}
      </div>
    </div>
  {/each}
</div>
