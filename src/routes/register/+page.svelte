<script lang="ts">
    import type { ActionData } from './$types';

    export let form: ActionData;
</script>

<form class="form" action="?/register" method="POST">
    <h1>Register</h1>

    <label for="username">
        Username
        <input id="username" name="username" type="text" required />
    </label>

    <label for="password">
        Password
        <input id="password" name="password" type="password" required />
    </label>

    <label for="email">
        Email
        <input id="email" name="email" type="email" required />
    </label>

    {#if form?.usernameTaken}
        <p class="error">Username is taken.</p>
    {/if}
    {#if form?.emailTaken}
        <p class="error">Email is taken.</p>
    {/if}

    <button class="register__button" type="submit">Register</button>
</form>

<style>
    .form {
        display: flex;
        width: 100%;
        flex: 1;
        margin-bottom: 6rem;
        align-self: center;
        justify-content: flex-end;
        max-width: 32rem;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        font-size: 1.2rem;
    }
    h1 {
        font-size: 2.5rem;
        align-self: center;
    }
    label {
        display: flex;
        flex-direction: column;
    }
    .register__button {
        font-size: 1.3rem;
        padding: 0.6rem;
    }
</style>
