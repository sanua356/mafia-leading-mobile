<script>
    import Container from "../components/Container.svelte";
    import Layout from "../components/Layout.svelte";
    import Table from "../components/Table.svelte";
    import { fade, fly } from "svelte/transition";
    import Button from "../components/Button.svelte";
    import { navigateTo } from "svelte-router-spa";
    import Modal from "../components/Modal.svelte";
    import ModalContainer from "../components/ModalContainer.svelte";

    //Хранилище всех (100 последних) раздач
    let history = JSON.parse(localStorage.getItem("history")) || [];

    //Преобразовать UNIX время в дату формата: ДД.ММ.ГГГГ
    function createCurrentDate(unixDate) {
        let today = new Date(unixDate * 1000);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        today = dd + "." + mm + "." + yyyy;
        return today;
    }
    //Преобразовать UNIX время в время формата: ЧЧ:ММ
    function createCurrentTime(unixDate) {
        let today = new Date(unixDate * 1000);
        today =
            String(today.getHours()).padStart(2, "0") +
            ":" +
            String(today.getMinutes()).padStart(2, "0");
        return today;
    }

    //Удалить игру из истории раздач по её индексу
    function onDeleteGame(idx) {
        history.splice(idx, 1);
        localStorage.setItem("history", JSON.stringify(history));
        if (history.length === 0) {
            localStorage.removeItem("history");
            history = [];
        } else {
            history = JSON.parse(localStorage.getItem("history"));
        }
    }

    //Переменная, хранящяя ID текущей игры (нужно, чтобы модалка по клику на "подробнее" знала, у какой игры брать данные)
    let selectedHistoryGameID = 0;

    //Переменная и функция для показа/скрытия меню "подробнее" для игры
    let viewDetailsModalFlag = false;
    function viewGameDetails(gameID) {
        selectedHistoryGameID = gameID;
        viewDetailsModalFlag = true;
    }
</script>

<Layout>
    <Container>
        <h1>История игр</h1>
        <hr />
        {#if history.length > 0}
            <Table>
                <thead>
                    <th align="left">Дата раздачи</th>
                    <th align="center">Карты (шт)</th>
                    <th align="right">Действия</th>
                </thead>
                {#each history as game, idx}
                    <tr transition:fly={{ y: 100, duration: 200 }}>
                        <td class="dateAndTime">
                            <span>{createCurrentDate(game.dateID)}</span>
                            <span>{createCurrentTime(game.dateID)}</span>
                        </td>
                        <td align="center">
                            {game.cardsOpened.length +
                                game.cardsHiddened.length}
                        </td>
                        <td align="right" class="actions">
                            <button
                                class="detailsBtn"
                                on:click={() => viewGameDetails(idx)}
                                >Подробнее</button
                            >
                            <button
                                class="deleteBtn"
                                on:click={() => onDeleteGame(idx)}
                                >Удалить</button
                            >
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
{#if viewDetailsModalFlag}
    <Modal clickEvent={() => (viewDetailsModalFlag = false)}>
        <ModalContainer customStyle="overflow-y: auto; margin: 30px 0px;">
            <div class="detailsArea">
                <div class="cardsDetails">
                    <h3>Вскрытые карты:</h3>
                    <div class="cardsList">
                        <p class="cardsListSubtitle">
                            В порядке от первой вскрытой к последующим:
                        </p>
                        {#if history[selectedHistoryGameID].cardsOpened.length > 0}
                            {#each history[selectedHistoryGameID].cardsOpened as card, idx}
                                <span>{idx + 1}. {card}</span>
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
                        {#if history[selectedHistoryGameID].cardsHiddened.length > 0}
                            {#each history[selectedHistoryGameID].cardsHiddened as card, idx}
                                <span>{idx + 1}. {card}</span>
                            {/each}
                        {:else}
                            <p class="emptyCardsTitle">Не вскрытых карт нет</p>
                        {/if}
                    </div>
                </div>
            </div>
        </ModalContainer>
    </Modal>
{/if}

<style>
    th {
        font-size: 1rem;
    }
    td {
        font-size: 0.9rem;
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
