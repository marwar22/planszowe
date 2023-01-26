<script lang="ts">
    import type { PageServerData } from './$types';

    export let data: PageServerData;
    $: boardGame = data.boardGame;
</script>

{#each boardGame.imageUrls as imageUrl}
    <img src={imageUrl} alt="board game" />
{/each}
