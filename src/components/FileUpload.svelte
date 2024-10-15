<script lang="ts">
  import { text } from "../lib/state.svelte";

  function uploadFile(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    const input = event.currentTarget;
    const uploadedFile = input.files?.[0];

    if (!uploadedFile) {
      alert("No file selected");
      return;
    }

    if (uploadedFile.type !== "text/plain") {
      alert("The file is not a .txt file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target?.result;

      if (typeof fileContent === "string") {
        text.text = fileContent;
      } else {
        console.error("File content is not a string");
      }
    };

    reader.onerror = () => {
      console.error("Error reading file");
    };

    reader.readAsText(uploadedFile);
  }
</script>

<button
  onclick={() => {
    const fileUpload = document.getElementById("file-upload");
    if (fileUpload) {
      fileUpload.click();
    }
  }}
  class="mx-auto mt-5 block w-40 rounded-md border border-gray-500 bg-purple py-2 text-gray-100 hover:bg-purple-600"
>
  Upload fil
</button>
<p class="text-center text-sm text-gray-600 dark:text-gray-400">
  Sletter alt tekst i tekstfeltet og erstatter det med indholdet af filen
</p>
<p class="text-center text-sm text-gray-600 dark:text-gray-400">
  Understøtter på lige nu kun .txt-filer
</p>

<input
  type="file"
  id="file-upload"
  accept=".txt"
  hidden
  onchange={uploadFile}
/>
