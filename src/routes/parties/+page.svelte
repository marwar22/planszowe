<script lang="ts">
    import type { PageServerData } from './$types';

    export let data: PageServerData;
    $: parties = data.parties;
    function dateToString(d: Date) {
        let pad = (v: any) => `0${v}`.slice(-2);
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}
        ${d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    }
</script>

<div class="parties">
    <h2>Your parties</h2>
    {#each parties as party}
        <a class="party" href="/parties/{party.id}">
            <h2 class="party__name">{party.name}</h2>
            <div class="party__data">
                <p>{party.description}</p>
                <span>{dateToString(party.date)}</span>
            </div>
            <!-- {JSON.stringify(party)} -->
        </a>
    {/each}
</div>

<style>
    .party__name {
        width: 10rem;
        margin: 0;
    }
    .parties {
        display: flex;
        flex-direction: column;
    }
    .party {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        background-color: white;
        border-radius: 1rem;
        border: 2px solid wheat;
        margin: 1rem 0;
        padding: 1rem;
        color: black;
        text-decoration: none;
    }
    .party:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 8px 0px, rgba(0, 0, 0, 0.07) 0px 0px 2px 1px;
    }
    .party:active {
        background-color: #e5e5e5;
    }
    .party__data {
        display: flex;
        flex-direction: column;
    }
</style>
