<script lang="ts">
    import type { PageServerData } from './$types';

    export let data: PageServerData;
    $: user = data.user;
    $: friends = user.friends;
    let potentialFriends: any[] = [];
    async function handleSubmit() {
        const res = await fetch('/api/friends/find');
        potentialFriends = await res.json();
        console.log(potentialFriends);
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
        <input type="text" placeholder="friend username" />
        <button>Find</button>
    </form>
</div>
{#each potentialFriends as potentialFriend}
    {potentialFriend.username}
{/each}
