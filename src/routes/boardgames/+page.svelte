<script lang="ts">
    import type { PageServerData } from './$types';

    export let data: PageServerData;
    $: boardGames = data.boardGames;
</script>

<div class="boardgames" />
<h1>Board Games</h1>
{#each boardGames as boardGame}
    <a class="boardgame" href="/boardgames/{boardGame.id}">
        <h2 class="boardgame__name">{boardGame.name}</h2>
        <div class="boardgame__data">
            {#if boardGame.imageUrls[0]}
                <img
                    class="boardgame__image"
                    src={boardGame.imageUrls[0]}
                    alt="Image of {boardGame.name}"
                />
            {/if}
            <p>{boardGame.description}</p>
        </div>
        <!-- {JSON.stringify(boardGame)} -->
    </a>
{/each}

<style>
    .boardgame__name {
        width: 10rem;
        margin: 0;
    }
    .boardgames {
        display: flex;
        flex-direction: column;
    }
    .boardgame {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        background-color: white;
        border-radius: 1rem;
        border: 2px solid wheat;
        margin: 0.7rem 0;
        padding: 1rem;
        color: black;
        text-decoration: none;
    }
    .boardgame:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 8px 0px, rgba(0, 0, 0, 0.07) 0px 0px 2px 1px;
    }
    .boardgame:active {
        background-color: #e5e5e5;
    }
    .boardgame__image {
        margin-right: 1rem;
        height: 10rem;
        max-height: 10rem;
    }
    .boardgame__data {
        display: flex;
    }
</style>
