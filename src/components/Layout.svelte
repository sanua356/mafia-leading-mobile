<script>
    import { fade } from "svelte/transition";
    export let customStyles = "";
</script>

<section class="layout" style={customStyles} in:fade>
    <slot />
</section>

<style>
    .layout {
        min-height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #22212f;
    }
</style>
