<script lang="ts">
    import type { PageServerData } from './$types';
    import Plus from 'svelte-material-icons/Plus.svelte';
    import { invalidate, invalidateAll } from '$app/navigation';
    export let data: PageServerData;
    $: user = data.user;
    $: friends = user.friends;
    let potentialFriends: any[] = [];
    let usernameInput = '';
    async function handleSubmit() {
        const res = await fetch(
            '/api/friends/find?' + new URLSearchParams([['username', usernameInput]])
        );
        potentialFriends = await res.json();
    }
    async function addFriend(friendId: number) {
        await fetch('/api/friends/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ friendId })
        });
        potentialFriends = potentialFriends.filter(
            (potentialFriend) => potentialFriend.id !== friendId
        );
        invalidateAll();
    }
</script>

<h1>Account</h1>
<h2>Username</h2>
{user.username}
<h2>Friends</h2>
<ul>
    {#each friends as friend}
        <li>{friend.username}</li>
    {/each}
</ul>
<div>
    <form method="POST" on:submit|preventDefault={handleSubmit}>
        <input type="text" placeholder="friend username" bind:value={usernameInput} />
        <button>Find</button>
    </form>
</div>
<div>
    {#each potentialFriends as potentialFriend}
        <div class="potential-friend">
            <button class="potential-friend__button" on:click={() => addFriend(potentialFriend.id)}>
                <Plus size="2rem" />
            </button>
            {potentialFriend.username}
        </div>
    {/each}
</div>

<style>
    .potential-friend {
        display: flex;
        align-items: center;
    }
    .potential-friend__button {
        color: hsl(120, 100%, 29%);
        width: 3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        outline: none;
        border-radius: 20rem;
    }
    .potential-friend__button:hover {
        color: hsl(120, 100%, 19%);
    }
    .potential-friend__button:active {
        color: hsl(120, 100%, 15%);
    }
</style>
