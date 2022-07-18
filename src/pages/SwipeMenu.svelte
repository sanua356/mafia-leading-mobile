<script>
    import { onDestroy, onMount } from "svelte";
    import { navigateTo, routeIsActive } from "svelte-router-spa";
    import Modal from "../components/Modal.svelte";
    import Transition from "../components/Transition.svelte";
    import { settingsStore } from "../store/settings.js";
    import { mainStore } from "../store/showdistrib.js";

    let startX = null,
        deathZone = window.screen.width * ($settingsStore.deathZoneSwipe / 100);
    function initMenu() {
        document.addEventListener("touchstart", touchStart);
        document.addEventListener("touchmove", touchMove);
    }
    function touchStart(e) {
        startX = e.touches[0].clientX;
    }
    function touchMove(e) {
        if (e.touches[0].target.nodeName === "INPUT") {
            return;
        }
        let movedX = e.touches[0].clientX;
        if (movedX - startX > deathZone) {
            settingsStore.changeViewFlag(true);
        }
        if (movedX - startX < deathZone) {
            settingsStore.changeViewFlag(false);
        }
    }

    $: {
        deathZone = window.screen.width * ($settingsStore.deathZoneSwipe / 100);
        document.removeEventListener("touchstart", touchStart, false);
        document.removeEventListener("touchmove", touchStart, false);
        initMenu();
    }
    onMount(() => {
        initMenu();
    });
    onDestroy(() => {
        document.removeEventListener("touchstart");
        document.removeEventListener("touchmove");
    });

    let animationFlag = false;
    $: {
        if ($settingsStore.menuViewFlag) {
            window.setTimeout(() => {
                animationFlag = true;
            }, 15);
        } else {
            animationFlag = false;
        }
    }
</script>

<Modal
    showFlag={$settingsStore.menuViewFlag}
    style={"z-index: 9999;"}
    clickEvent={() => settingsStore.changeViewFlag(false)}
>
    <div
        class="swipeMenu"
        class:enabled={animationFlag}
        on:click={(e) => e.stopPropagation()}
    >
        <h1>Меню</h1>
        <nav>
            <ul on:click={() => settingsStore.changeViewFlag(false)}>
                <li on:click={() => navigateTo("/")}>Главная</li>
                <li on:click={() => navigateTo("home")}>Раздать карты</li>
                <li on:click={() => navigateTo("history")}>История игр</li>
                <li on:click={() => navigateTo("settings")}>Настройки</li>
                <li on:click={() => navigateTo("help")}>Помощь</li>
                <li on:click={() => navigateTo("rules")}>Правила игры</li>
                <li
                    on:click={mainStore.returnOpenedCardInRotation}
                    class={!routeIsActive("show-distribution") ||
                    $mainStore.cardsOpened.length === 0
                        ? "disabled"
                        : ""}
                >
                    Вернуть прошлую карту в ротацию <span
                        class={routeIsActive("show-distribution")
                            ? "hiddened"
                            : ""}
                        >Доступно только во время выдачи карт игрокам</span
                    >
                </li>
            </ul>
        </nav>
    </div>
</Modal>

<style>
    .swipeMenu {
        position: absolute;
        top: 0;
        left: -100%;
        width: 60%;
        min-height: 100vh;
        background-color: #27263b;
        color: #eeeef5;
        padding: 30px 20px;
        transition: 0.3s ease-in-out all;
    }
    .enabled {
        left: 0 !important;
    }
    @media screen and (min-width: 481px) and (max-width: 1024px) {
        .swipeMenu {
            width: 45%;
        }
    }
    @media screen and (min-width: 1025px) and (max-width: 1440px) {
        .swipeMenu {
            width: 35%;
        }
    }
    .swipeMenu ul {
        margin-top: 40px;
    }
    .swipeMenu li {
        list-style-type: none;
        margin-bottom: 20px;
        font-size: 1.1rem;
    }
    .swipeMenu li > span {
        margin-top: 5px;
        display: block;
        font-size: 0.8rem;
        color: gray;
    }
    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }
    .hiddened {
        display: none !important;
    }
</style>
