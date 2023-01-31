<script lang="ts">
    import type { ActionData } from './$types';

    export let form: ActionData;

    let images: (FileList | null)[] = [null];
    let rules: FileList | null = null;
    $: console.log(images);
    $: {
        const lastIndex = images.length - 1;
        if (lastIndex >= 0) {
            const image = images[lastIndex];
            if (isImage(image)) {
                images.push(null);
            } else {
                if (lastIndex >= 1) {
                    const image2 = images[lastIndex - 1];
                    if (!isImage(image2)) {
                        images.length = images.length - 1;
                    }
                }
            }
        }
    }
    function isImage(image: FileList | null) {
        return !(!image || image.length == 0);
    }
</script>

<form class="form" action="?/create" method="POST" enctype="multipart/form-data">
    <h1 class="h1">Creating new Board Game</h1>
    <label>
        Name
        <input name="name" type="text" />
    </label>
    <label>
        Description
        <textarea class="description__textarea" name="description" />
    </label>
    {#if form?.nameError}Name can't be empty{/if}
    {#if form?.descriptionError}Description can't be empty{/if}
    Images
    {#each images as image, index}
        <input
            class="file__input"
            bind:files={image}
            type="file"
            name="image{index}"
            accept="image/png, image/jpeg, image/jpg, image/webp"
        />
    {/each}
    Rules
    <input
        class="file__input"
        bind:files={rules}
        type="file"
        name="rules"
        accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf"
    />
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
    }
    .description__textarea {
        resize: vertical;
    }
    .create__button {
        font-size: 1.3rem;
        padding: 0.6rem;
    }
    .file__input {
        margin: 0.3rem 0;
    }
</style>
