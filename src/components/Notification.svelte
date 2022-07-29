<script>
    import { notificationStore } from "../store/notification.js";
    import Transition from "./Transition.svelte";

    let showFlag = false;

    $: {
        if (
            $notificationStore.title.length > 0 &&
            $notificationStore.message.length > 0
        ) {
            showFlag = true;
            setTimeout(() => {
                showFlag = false;
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
    <div class="notification">
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
        max-width: 100vw;
        margin: 20px;
        background: #3f3d5e;
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
        opacity: 0.7;
        text-align: justify;
        line-height: 1.2rem;
        font-size: 1rem;
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
