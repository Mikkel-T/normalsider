<script lang="ts">
  import { rules } from "../lib/state.svelte";
  import RuleButton from "./RuleButton.svelte";

  $effect(() => {
    const customRule = localStorage.getItem("customRule");
    if (customRule) {
      rules.rules = JSON.parse(customRule);
    }
  });

  $effect(() => {
    localStorage.setItem("customRule", JSON.stringify(rules.rules));
  });
</script>

<div>
  <div class="text-center text-2xl font-bold text-purple">
    Indstillinger for egen definition
  </div>
  <div class="mx-auto w-fit">
    <label for="custom-length" class="block">Antal tegn per normalside:</label>
    <input
      type="number"
      bind:value={rules.rules.length}
      min="0"
      class="mb-2 rounded-md border-2 bg-gray-100 p-1 dark:bg-zinc-800"
      id="custom-length"
    />
  </div>
  <div
    class="mx-auto grid w-full grid-cols-1 gap-1 sm:w-1/2 md:w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <RuleButton name="Bogstaver" rule="letters" example="ABCÆØÅabcæøå" />
    <RuleButton name="Tal" rule="numbers" example="0123456789" />
    <RuleButton name="Mellemrum" rule="spaces" example="&nbsp;" />
    <RuleButton name="Symboler" rule="symbols" example={"!?,+.'/\"()%*"} />
  </div>
</div>
