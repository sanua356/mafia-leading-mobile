<script>
    import { mainStore } from "../store/showdistrib.js";
    import Layout from "../components/Layout.svelte";
    import { navigateTo } from "svelte-router-spa";
    import { onMount } from "svelte";
    import { settingsStore } from "../store/settings.js";
    import { allCardsList, unknownCardIcon } from "../constants/cards.js";
    import Image from "../components/Image.svelte";

    //Статус показа карты (рубашка - false, название карты - true)
    let cardViewFlag = false;

    //Название показываемой на данный момент карты
    let activeCard = "";
    //Переменная с DOM элементом карточки для выдачи
    let cardNode;

    //Статус завершения раздачи (true - раздача окончена)
    let closeDistributionFlag = false;

    //Таймер отображения вскрытой карты на экране
    let timer = null;

    //Функция показа ролей карт
    function onCardOpened() {
        function disableClickInAnimationTime() {
            cardNode.style.pointerEvents = "none";
            setTimeout(() => {
                cardNode.style.pointerEvents = "auto";
            }, 900);
        }

        if (closeDistributionFlag === false) {
            disableClickInAnimationTime();
        }
        if ($mainStore.cardsHiddened.length > 0) {
            //Если роль на данный момент не видна игроку
            if (cardViewFlag === false) {
                activeCard = $mainStore.cardsHiddened[0];
                mainStore.deleteOpenedCard();
                mainStore.pushToHistoryDistribution(activeCard);
                mainStore.saveDistributionInLocalStorage();
                cardViewFlag = true;
                //Если в настройках установлен тип скрытия карт "по таймеру"
                if ($settingsStore.hiddeningCardsFlag) {
                    if (timer === null) {
                        timer = setTimeout(() => {
                            cardViewFlag = false;
                            clearTimeout(timer);
                            timer = null;
                            disableClickInAnimationTime();
                        }, $settingsStore.hiddeningCardsFlagTimer * 1000);
                    }
                }
            } else {
                if (timer === null) {
                    cardViewFlag = false;
                }
            }
        } else {
            if (closeDistributionFlag === true) {
                navigateTo("/");
            }
            activeCard = "Раздача окончена. Нажмите ещё раз для выхода в меню.";
            cardViewFlag = true;
            closeDistributionFlag = true;
        }
    }

    onMount(() => {
        mainStore.saveDistributionDate();
    });
</script>

<Layout>
    <div class="cardsArea">
        <h1>Нажмите на карту, чтобы получить свою роль</h1>
        <div class="card" on:click={onCardOpened} bind:this={cardNode}>
            <div class="cardFront{cardViewFlag ? ' cardFrontHiddened' : ''}" />
            <div class="cardBack{cardViewFlag ? ' cardBackOpened' : ''}">
                {#if !closeDistributionFlag && $settingsStore.viewIconsCards}
                    <Image
                        alt="Иконка роли"
                        imgSrc={allCardsList()[activeCard]?.icon}
                        boundaryImgSrc={unknownCardIcon}
                    />
                {/if}
                <span class="activeRoleName"
                    >{allCardsList().hasOwnProperty(activeCard)
                        ? allCardsList()[activeCard].name
                        : activeCard}</span
                >
                {#if !closeDistributionFlag && $settingsStore.viewDescriptionCards}
                    <p class="roleDescription">
                        {allCardsList()[activeCard]?.description?.length > 0
                            ? allCardsList()[activeCard]?.description
                            : "Для данной роли нет описания"}
                    </p>
                {/if}
            </div>
        </div>
        <span class="cardsCounter"
            >Осталось карт: {$mainStore.cardsHiddened.length}</span
        >
    </div>
</Layout>

<style>
    .cardsArea {
        width: 100%;
        overflow: hidden;
        color: #eeeef5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: auto;
        align-self: baseline;
        padding: 25px;
        min-height: 100vh;
    }
    .cardsArea h1 {
        font-size: 1.5rem;
        text-align: center;
    }
    .card {
        flex: 1 1 auto;
        margin: 30px;
        position: relative;
        perspective: 1000px;
    }
    .cardsCounter {
        font-size: 1.4rem;
        text-align: center;
    }
    .cardFront,
    .cardBack {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        transition: 1s;
        backface-visibility: hidden;
        overflow: hidden;
        border-radius: 20px;
        border: 2px solid #eeeef5;
        text-align: center;
    }
    .cardFront {
        background-image: url("/assets/cardbg.jpg");
        background-size: contain;
    }
    .cardBack {
        background-color: #3f3d5e;
        font-size: 1.8rem;
        transform: rotateY(-180deg);
    }
    :global(.cardBack img) {
        max-width: 70%;
        height: auto;
        margin: 10px auto;
    }
    .activeRoleName {
        font-size: 1.7rem;
        margin: 0 5%;
    }
    .roleDescription {
        font-size: 0.9rem;
        opacity: 0.6;
        width: 80%;
        margin: 0 auto;
        margin-top: 5px;
    }
    .cardFrontHiddened {
        transform: rotateY(-180deg);
    }
    .cardBackOpened {
        transform: rotateY(-360deg);
    }
</style>
