<script>
    import { onMount } from "svelte";
    import { blur } from "svelte/transition";
    export let style = "",
        clickEvent = () => {};
</script>

<div class="modal" {style} on:click={clickEvent} transition:blur|local>
    <slot />
</div>

<style>
    .modal {
        position: fixed;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        z-index: 999;
    }
</style>
