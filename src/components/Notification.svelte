<script>
    import { notificationStore } from "../store/notification.js";
    import Transition from "./Transition.svelte";

    let showFlag = false;
    let timer = null;
    $: {
        if (
            $notificationStore.title.length > 0 &&
            $notificationStore.message.length > 0
        ) {
            showFlag = true;
            clearTimeout(timer);
            timer = setTimeout(() => {
                showFlag = false;
                clearTimeout(timer);
            }, 3000);
        }
    }
</script>

<Transition
    {showFlag}
    mountClass={"notificationMounting"}
    unmountClass={"notificationUnmounting"}
    unmountDuration={400}
>
    <div class={`notification ${"notification__" + $notificationStore.type}`}>
        <span>{$notificationStore.title}</span>
        <p>{$notificationStore.message}</p>
    </div>
</Transition>

<style>
    .notification {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        color: #eeeef5;
        max-width: calc(100vw - 40px);
        margin: 20px;
        padding: 20px;
        border-radius: 5px;
        transition: 0.4s ease-in-out all;
        opacity: 0;
        transform: translateY(-100px);
    }
    .notification span {
        display: block;
        font-weight: bold;
        margin-bottom: 15px;
        font-size: 1.3rem;
    }
    .notification p {
        text-align: left;
        line-height: 1.2rem;
        font-size: 1rem;
    }
    .notification__warning {
        background: #3f3d5e;
    }
    .notification__warning p {
        opacity: 0.7;
    }
    .notification__error {
        background: #ff002f;
    }
    :global(.notificationMounting) {
        opacity: 1 !important;
        transform: translateY(0px) !important;
    }
    :global(.notificationUnmounting) {
        opacity: 0 !important;
        transform: translateY(-100px) !important;
    }
</style>
