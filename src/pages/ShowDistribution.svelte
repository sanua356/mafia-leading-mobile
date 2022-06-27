<script>
    import { mainStore } from "../store/showdistrib.js";
    import Layout from "../components/Layout.svelte";
    import { navigateTo } from "svelte-router-spa";
    import { onMount } from "svelte";

    //Статус показа карты (рубашка - false, название карты - true)
    let cardViewFlag = false;

    //Название показываемой на данный момент карты
    let activeCard = "";

    //Статус завершения раздачи (true - раздача окончена)
    let closeDistributionFlag = false;

    //Функция показа ролей карт
    function onCardOpened() {
        let openedCardsCount = $mainStore.cardsHiddened.length;
        if (openedCardsCount > 0) {
            if (cardViewFlag === false) {
                activeCard = $mainStore.cardsHiddened[0];
                mainStore.deleteOpenedCard();
                mainStore.pushToHistoryDistribution(activeCard);
                mainStore.saveDistributionInLocalStorage();
            }
            cardViewFlag = !cardViewFlag;
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
        <div class="card" on:click={onCardOpened}>
            <div class="cardFront{cardViewFlag ? ' cardFrontHiddened' : ''}">
                <img src="assets/logo2.png" alt="Логотип" />
            </div>
            <div class="cardBack{cardViewFlag ? ' cardBackOpened' : ''}">
                <span>{activeCard}</span>
            </div>
        </div>
        <span class="cardsCounter"
            >Осталось карт: {$mainStore.cardsHiddened.length}</span
        >
        <!-- <button on:click={mainStore.returnOpenedCardInRotation}
            >Вернуть карту в ротацию</button
        > -->
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
        transition: 1s;
        backface-visibility: hidden;
        overflow: hidden;
        border-radius: 20px;
        text-align: center;
    }
    .cardFront {
        background-image: url("/assets/cardbg.jpg");
    }
    .cardBack {
        background-color: #3f3d5e;
        font-size: 1.8rem;
        transform: rotateY(-180deg);
    }
    .cardFrontHiddened {
        transform: rotateY(-180deg);
    }
    .cardBackOpened {
        transform: rotateY(-360deg);
    }
</style>
