<script lang="ts">
    import type { ActionData, PageServerData } from './$types';

    export let form: ActionData;
    export let data: PageServerData;
    $: friends = data.friends;
    $: boardgames = data.boardgames;
</script>

<form class="form" action="?/create" method="POST" enctype="multipart/form-data">
    <h1 class="h1">Creating new Party</h1>
    <label>
        Name
        <input name="name" type="text" />
    </label>
    {#if form?.nameError}Name can't be empty{/if}
    <label>
        Description
        <textarea class="description__textarea" name="description" />
    </label>
    {#if form?.descriptionError}Description can't be empty{/if}
    <label class="form__checkbox-label">
        Date
        <input class="form__date" name="date" type="datetime-local" />
    </label>
    <label class="form__checkbox-label">
        Send email
        <input class="form__checkbox" name="sendemails" type="checkbox" />
    </label>
    <h2>Invited Friends</h2>
    {#each friends as friend}
        <label class="form__checkbox-label">
            <input class="form__checkbox" name="friend{friend.id}" type="checkbox" />
            {friend.username}
        </label>
    {/each}
    <h2>Board Games</h2>
    {#each boardgames as boardgame}
        <label class="form__checkbox-label">
            <input class="form__checkbox" name="boardgame{boardgame.id}" type="checkbox" />
            {boardgame.name}
        </label>
    {/each}

    <button class="create__button">Create</button>
</form>

<style>
    .form {
        display: flex;
        flex-direction: column;
        font-size: 1.2rem;
    }
    .h1 {
        font-size: 2rem;
    }

    label {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    .description__textarea {
        resize: vertical;
    }
    .form__checkbox-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-self: flex-start;
    }
    .form__checkbox {
        height: 1.2rem;
        width: 1.2rem;
    }
    .create__button {
        font-size: 1.3rem;
        padding: 0.6rem;
    }
</style>
