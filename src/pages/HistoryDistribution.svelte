<script>
    import Container from "../components/Container.svelte";
    import Layout from "../components/Layout.svelte";
    import Table from "../components/Table.svelte";
    import { fade, fly } from "svelte/transition";
    import Button from "../components/Button.svelte";
    import { navigateTo } from "svelte-router-spa";

    let history = JSON.parse(localStorage.getItem("history")) || [];

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
    function createCurrentTime(unixDate) {
        let today = new Date(unixDate * 1000);
        today =
            String(today.getHours()).padStart(2, "0") +
            ":" +
            String(today.getMinutes()).padStart(2, "0");
        return today;
    }

    function onDeleteGame(idx) {
        history.splice(idx, 1);
        localStorage.setItem("history", JSON.stringify(history));
        if (history.length === 0) {
            localStorage.removeItem("history");
        } else {
            history = JSON.parse(localStorage.getItem("history"));
        }
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
                            <button class="detailsBtn">Подробнее</button>
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
</style>
