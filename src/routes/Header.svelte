<script lang="ts">
    import type { UserInfo } from '../app';
    import Home from 'svelte-material-icons/Home.svelte';
    import Account from 'svelte-material-icons/Account.svelte';
    import { goto } from '$app/navigation';
    export let userInfo: UserInfo;
    function login() {
        goto('/login');
    }
    function register() {
        goto('/register');
    }
    const size = '2rem';
</script>

<div class="header">
    <a class="home" href="/"><Home {size} /></a>
    <div class="spacer" />
    {#if userInfo.loggedIn}
        <a class="account__link" href="/account"> <Account {size} />{userInfo.username}</a>
        <form action="/logout" method="POST">
            <button class="header__button" type="submit">Log out</button>
        </form>
    {:else}
        <button class="header__button" on:click={login}>Log in</button>
        <button class="header__button" on:click={register}>Register</button>
    {/if}
</div>

<style>
    .home {
        padding: 0.3rem;
        display: flex;
    }
    .header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--color-primary-border);
    }
    .account__link {
        display: flex;
        align-items: center;
        margin-right: 0.8rem;
    }
    .spacer {
        flex: 1;
    }
    .header__button {
        margin-right: 0.5rem;
    }
</style>
