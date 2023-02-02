<script lang="ts">
    import type { PageServerData } from './$types';

    export let data: PageServerData;
    $: party = data.party;
</script>

<div>
    <h1>{party.name}</h1>
    <p>
        {party.description}
    </p>
    <h2>Participants</h2>
    <ul>
        {#each party.Users as user}
            <li>{user.username}</li>
        {/each}
    </ul>
    <h2>Board Games</h2>
    <ul>
        {#each party.BoardGames as boardGame}
            <li><a href="/boardgames/{boardGame.id}">{boardGame.name}</a></li>
        {/each}
    </ul>
</div>
