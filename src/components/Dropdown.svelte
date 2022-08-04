<script>
    import { onDestroy } from "svelte";

    import Transition from "./Transition.svelte";
    export let title = "Дедос",
        style = "";

    let showFlag = false;

    onDestroy(() => {
        console.log("destroying");
        showFlag = false;
    });
</script>

<div class="dropdown" {style}>
    <div class="preview">
        <h2>{title}</h2>
        <img
            class="arrowBtn"
            class:opened={showFlag}
            src="assets/arrow.png"
            alt="Стрелка показа подробного инфо"
            on:click={() => {
                showFlag = !showFlag;
            }}
        />
    </div>
    <Transition
        {showFlag}
        mountClass="dropdownOpened"
        unmountClass="dropdownClosed"
        unmountDuration={400}
    >
        <div class="details">
            <slot />
        </div>
    </Transition>
</div>

<style>
    .dropdown {
        margin: 20px 0;
        width: 100%;
    }
    .preview {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .preview h2 {
        font-size: 1.2rem;
    }
    .preview img {
        max-width: 35px;
        height: auto;
        background: #ff002f;
        border-radius: 50%;
        padding: 10px;
        transform: rotate(90deg);
    }
    .details {
        margin-top: 15px;
        width: 100%;
        transform: scaleY(0);
        transform-origin: top;
        transition: 0.4s ease-in-out all;
    }
    :global(.dropdownOpened) {
        transform: scaleY(1) !important;
    }
    :global(.dropdownClosed) {
        transform: scaleY(0) !important;
    }
    .arrowBtn {
        transition: 0.4s ease-in-out all;
    }
    .opened {
        transform: rotate(270deg) !important;
    }
</style>
