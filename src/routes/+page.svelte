<script lang="ts">
    import Checkerboard from 'svelte-material-icons/Checkerboard.svelte';
    import CheckerboardPlus from 'svelte-material-icons/CheckerboardPlus.svelte';
    import AccountMultiple from 'svelte-material-icons/AccountMultiple.svelte';
    import AccountMultiplePlus from 'svelte-material-icons/AccountMultiplePlus.svelte';
    const size = '4rem';
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Board games app" />
</svelte:head>

<div class="menu">
    <a class="link" href="/boardgames">
        <Checkerboard {size} />
        <span class="link__span">Board Games</span>
    </a>
    <a class="link" href="/boardgames/create">
        <CheckerboardPlus {size} />
        <span class="link__span">Add Board Game</span>
    </a>
    <a class="link" href="/parties/">
        <AccountMultiple {size} />
        <span class="link__span">Your Parties</span>
    </a>
    <a class="link" href="/parties/create">
        <AccountMultiplePlus {size} />
        <span class="link__span">Create Party</span>
    </a>
</div>

<style>
    .link {
        display: flex;
        align-items: center;
        border: 1px solid var(--color-primary-border);
        border-radius: 0.7rem;
        padding: 0.5rem;
        margin: 1rem 0;
    }
    .link__span {
        font-size: 1.5rem;
        margin-left: 1rem;
    }
    .link:hover {
        background-color: hsl(31, 49%, 96%);
    }
    .link:active {
        background-color: hsl(31, 49%, 98%);
    }

    .menu {
        display: flex;
        flex-direction: column;
    }
</style>
