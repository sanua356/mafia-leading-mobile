<script>
    import Container from "../components/Container.svelte";
    import Layout from "../components/Layout.svelte";
    import Table from "../components/Table.svelte";
    import { fly } from "svelte/transition";
    import Button from "../components/Button.svelte";
    import { navigateTo } from "svelte-router-spa";
    import Modal from "../components/Modal.svelte";
    import ModalContainer from "../components/ModalContainer.svelte";
    import { allCardsList } from "../constants/cards";
    import { onMount } from "svelte";
    import ConfirmActionModal from "../components/modals/ConfirmActionModal.svelte";
    import { historyDistribStore } from "../store/historydistrib.js";

    onMount(() => {
        window.scrollTo(0, 0);
    });

    //Параметры модалки с подтверждением удаления всех раздач из истории
    let deleteAllGamesModalParams = {
        showFlag: false,
        title: "Вы точно хотите удалить все раздачи из истории?",
        confirmBtnText: "Подтвердить",
        confirmBtnEvent: onClearAllGames,
        backBtnEvent: () => {
            deleteAllGamesModalParams.showFlag = false;
        },
    };

    //Переменная, хранящяя ID текущей игры (нужно, чтобы модалка по клику на "подробнее" знала, у какой игры брать данные)
    let selectedHistoryGameID = 0;

    //Переменная и функция для показа/скрытия меню "подробнее" для игры
    let viewDetailsModalFlag = false;
    function viewGameDetails(gameID) {
        selectedHistoryGameID = gameID;
        viewDetailsModalFlag = true;
    }

    function onClearAllGames(){
        historyDistribStore.clearAllGames();
        deleteAllGamesModalParams.showFlag = false;
    }
</script>

<Layout>
    <Container>
        <div class="titleAndDesc">
            <div class="titleAndDesc-info">
                <h1>История игр</h1>
                <hr />
            </div>
            <div class="clearAllGames">
                <img
                    src="../assets/trash.png"
                    alt="Удалить все раздачи"
                    on:click={() => {
                        deleteAllGamesModalParams.showFlag = true;
                    }}
                />
            </div>
        </div>

        {#if $historyDistribStore.history.length > 0}
            <Table>
                <thead>
                    <th align="left">Дата раздачи</th>
                    <th align="center">Карты (шт)</th>
                    <th align="right">Действия</th>
                </thead>
                {#each $historyDistribStore.history as game, idx (game.dateID)}
                    <tr transition:fly={{ y: 100, duration: 200 }}>
                        <td class="dateAndTime">
                            <span>
                                {historyDistribStore.createCurrentDate(
                                    game.dateID
                                )}
                            </span>
                            <span>
                                {historyDistribStore.createCurrentTime(
                                    game.dateID
                                )}
                            </span>
                        </td>
                        <td align="center">
                            {game.cardsOpened.length +
                                game.cardsHiddened.length}
                        </td>
                        <td align="right" class="actions">
                            <button
                                class="detailsBtn"
                                on:click={() => viewGameDetails(idx)}
                            >
                                Подробнее
                            </button>
                            <button
                                class="deleteBtn"
                                on:click={() =>
                                    historyDistribStore.onDeleteGame(idx)}
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                {/each}
            </Table>
        {:else}
            <div class="noGamesArea">
                <img src="assets/nogames.png" alt="Грусный смайлик :(" />
                <span>Вы не провели ни одной игры</span>
                <Button clickEvent={() => navigateTo("home")}
                    >Начать игру</Button
                >
            </div>
        {/if}
    </Container>
</Layout>

<ConfirmActionModal {...deleteAllGamesModalParams} />

<Modal
    showFlag={viewDetailsModalFlag}
    clickEvent={() => (viewDetailsModalFlag = false)}
>
    <ModalContainer customStyle="overflow-y: auto; margin: 30px 0px;">
        <div class="detailsArea">
            <div class="cardsDetails">
                <h3>Вскрытые карты:</h3>
                <div class="cardsList">
                    <p class="cardsListSubtitle">
                        В порядке от первой вскрытой к последующим:
                    </p>
                    {#if $historyDistribStore.history[selectedHistoryGameID].cardsOpened.length > 0}
                        {#each $historyDistribStore.history[selectedHistoryGameID].cardsOpened as card, idx}
                            <span>
                                {idx + 1}. {allCardsList()[card]?.name ||
                                    "Неизвестная роль"}
                            </span>
                        {/each}
                    {:else}
                        <p class="emptyCardsTitle">Вскрытых карт нет</p>
                    {/if}
                </div>
            </div>

            <div class="cardsDetails">
                <h3 class="hiddenedCardsTitle">Не вскрытые карты:</h3>
                <div class="cardsList hiddenedCards">
                    <p class="cardsListSubtitle">
                        В порядке от первой НЕ вскрытой к последующим:
                    </p>
                    {#if $historyDistribStore.history[selectedHistoryGameID].cardsHiddened.length > 0}
                        {#each $historyDistribStore.history[selectedHistoryGameID].cardsHiddened as card, idx}
                            <span>
                                {idx + 1}. {allCardsList()[card]?.name ||
                                    "Неизвестная роль"}
                            </span>
                        {/each}
                    {:else}
                        <p
                            class="emptyCardsTitle"
                            style="padding-bottom: 15px;"
                        >
                            Не вскрытых карт нет
                        </p>
                    {/if}
                </div>
            </div>
        </div>
    </ModalContainer>
</Modal>

<style>
    .titleAndDesc {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
    .titleAndDesc img {
        transform: translateY(5px);
        max-width: 25px;
        height: auto;
    }
    th {
        font-size: 1rem;
    }
    td {
        font-size: 0.9rem;
    }
    @media screen and (min-width: 600px) and (max-width: 992px) {
        td {
            font-size: 1rem;
        }
    }
    @media screen and (min-width: 993px) and (max-width: 1440px) {
        td {
            font-size: 1.1rem;
        }
    }
    .detailsBtn {
        background-color: #3f3d5e;
        margin-bottom: 5px;
    }
    .deleteBtn {
        background-color: #ff002f;
    }
    .actions button {
        color: #eeeef5;
        border: none;
        border-radius: 5px;
        padding: 5px 8px;
    }
    @media screen and (min-width: 600px) and (max-width: 1440px) {
        .actions button {
            padding: 5px 15px;
            font-size: 1rem;
        }
        .actions button:first-child {
            margin-right: 10px;
        }
    }
    .noGamesArea {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        flex-direction: column;
    }
    .noGamesArea img {
        max-width: 60%;
        height: auto;
        margin-bottom: 20px;
    }
    .noGamesArea span {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 20px;
    }
    .detailsArea {
        color: #eeeef5;
        width: 100%;
        height: 100%;
        padding-top: 30px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .cardsList {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    }
    .cardsList span {
        margin-bottom: 5px;
    }
    .cardsList.hiddenedCards span:last-child {
        margin-bottom: 30px;
    }
    .emptyCardsTitle {
        margin-bottom: 15px;
    }
    .hiddenedCardsTitle {
        margin-top: 20px;
    }
    .cardsListSubtitle {
        color: #eeeef5;
        opacity: 0.5;
        font-size: 0.9rem;
        margin-bottom: 15px;
        margin-top: 5px;
    }
</style>
