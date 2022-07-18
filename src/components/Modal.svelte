<script>
    import Transition from "./Transition.svelte";

    export let style = "",
        clickEvent = () => {},
        showFlag = false;
</script>

<Transition
    {showFlag}
    mountClass={"modalMounting"}
    unmountClass={"modalUnmounting"}
    unmountDuration={300}
>
    <div class="modal" {style} on:click={clickEvent}>
        <slot />
    </div>
</Transition>

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
        z-index: 999;
        transition: all 0.3s ease-in-out;
        backdrop-filter: blur(0px);
        opacity: 0;
    }
    :global(.modalMounting) {
        backdrop-filter: blur(10px) !important;
        opacity: 1 !important;
    }
    :global(.modalUnmounting) {
        backdrop-filter: blur(0px) !important;
        opacity: 0 !important;
    }
</style>
