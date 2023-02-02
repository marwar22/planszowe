<script lang="ts">
    import type { PageServerData } from './$types';
    import Download from 'svelte-material-icons/Download.svelte';
    export let data: PageServerData;
    $: boardGame = data.boardGame;
    function getEndpoint(url: string) {
        const re = /([^\/]+$)/;
        return re.exec(url)![0];
    }
    const size = '2rem';
</script>

<div>
    <h1>{boardGame.name}</h1>
    <p>
        {boardGame.description}
    </p>
    <h2>Images</h2>
    <div class="images">
        {#each boardGame.imageUrls as imageUrl}
            <img class="images__img" src={imageUrl} alt="board game" />
        {/each}
    </div>
    <h2>Rules</h2>
    {#if boardGame.rulesUrl}
        <a
            class="rules__link"
            href="/api/files/{getEndpoint(boardGame.rulesUrl)}"
            download="RULES_{boardGame.name}"
        >
            <Download {size} /> Download
        </a>
    {/if}
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
    .rules__link {
        display: flex;
        align-items: center;
        font-size: 1.05rem;
    }
</style>
