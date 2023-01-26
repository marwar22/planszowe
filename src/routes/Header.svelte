<script lang="ts">
    import type { UserInfo } from '../app';

    export let userInfo: UserInfo;
</script>

<div class="header">
    This isheader
    <a href="/">home</a>
    <div class="spacer" />
    {#if userInfo.loggedIn}
        <span>Logged as {userInfo.username}</span>
        <form action="/logout" method="POST">
            <button type="submit">Log out</button>
        </form>
    {:else}
        <span>Not logged in</span>
        <a href="/login">Log in</a>
        <a href="/register">Register</a>
    {/if}
</div>

<style>
    .header {
        display: flex;
    }
    .spacer {
        flex: 1;
    }
</style>
