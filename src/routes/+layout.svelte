<script lang="ts">
    import Header from './Header.svelte';
    import type { LayoutServerData } from './$types';
    import './styles.css';

    export let data: LayoutServerData;
</script>

<div class="app">
    <Header userInfo={data.userInfo} />

    <main>
        <slot />
    </main>

    <footer>
        Boardgames website using AWS created by Marcin Wróbel for Introduction to cloud computing
        course at University of Wrocław
    </footer>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
    }

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }
</style>
