<script lang="ts">
  import { countText, prettyPrintRules, textPages } from "../lib/rules";
  import { text, rules } from "../lib/state.svelte";
</script>

{#if rules.rules.length > 0 && (rules.rules.letters || rules.rules.numbers || rules.rules.spaces || rules.rules.symbols)}
  <div class="text-center">
    <div>Antal normalsider</div>
    <div class="text-6xl font-bold text-purple">
      {textPages(text.text, rules.rules).toFixed(2)}
    </div>
    <div>{countText(text.text, rules.rules)} talte tegn</div>
    <div class="mx-auto w-1/2 text-sm text-gray-800">
      1 normalside: {prettyPrintRules(rules.rules)}
    </div>
  </div>
{/if}
