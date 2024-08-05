<script lang="ts">
  let theme = $state("");

  $effect(() => {
    theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  function change_theme() {
    theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark");
  }
</script>

<button
  onclick={change_theme}
  class="mx-auto mt-5 block w-40 rounded-md border border-gray-500 py-2 {theme ===
  'dark'
    ? 'bg-purple text-gray-100 hover:border-gray-200'
    : 'bg-gray-100 text-purple hover:bg-gray-200'}"
  class:opacity-0={!theme}
  class:cursor-pointer={theme}
>
  {#if theme === "dark"}
    Skift til lyst tema
  {:else}
    Skift til mørkt tema
  {/if}
</button>
