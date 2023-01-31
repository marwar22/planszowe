<script lang="ts">
    import type { PageServerData } from './$types';

    export let data: PageServerData;
    $: boardGame = data.boardGame;
</script>

<div>
    <h1>{boardGame.name}</h1>
    <p>
        {boardGame.description}
    </p>
    <div class="images">
        {#each boardGame.imageUrls as imageUrl}
            <img class="images__img" src={imageUrl} alt="board game" />
        {/each}
    </div>
</div>

<style>
    .images {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    .images__img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
</style>
