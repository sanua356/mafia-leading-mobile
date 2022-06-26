<script>
    import { navigateTo } from "svelte-router-spa";
    import Button from "../components/Button.svelte";
    import Container from "../components/Container.svelte";
    import Layout from "../components/Layout.svelte";
    import Table from "../components/Table.svelte";
    import { cards } from "../constants/cards.js";
    import { manualStore } from "../store/manualdistrib.js";
    import { store } from "../store/autodistrib.js";

    function onDistributionComplieted() {
        store.loadCardsManual($manualStore.cards);
        store.calculateCardsCount();
        navigateTo("preview-distribution");
    }
</script>

<Layout>
    <Container>
        <div>
            <h1>Выберите карты</h1>
            <hr />
        </div>
        <div class="roles">
            <Table>
                <thead>
                    <th align="left">Название карты</th>
                    <th align="right">Количество</th>
                </thead>
                {#each Object.entries(cards) as [cardName, role]}
                    <tr>
                        <td>{role}</td>
                        <td align="right" class="cardCounterColumn">
                            <button
                                class="changeCardCountBtn"
                                on:click={() =>
                                    manualStore.incrementCardCount(cardName)}
                                >+</button
                            >
                            <input
                                type="number"
                                min="0"
                                max="100"
                                name={cardName}
                                value={$manualStore.cards[cardName]}
                                class="cardCountInput {$manualStore.cards[
                                    cardName
                                ] !== 0
                                    ? 'activeCard'
                                    : ''}"
                                on:input={(e) =>
                                    manualStore.onCardCountChanged(cardName, e)}
                            />
                            <button
                                class="changeCardCountBtn"
                                on:click={() =>
                                    manualStore.decrementCardCount(cardName)}
                                >-</button
                            >
                        </td>
                    </tr>
                {/each}
            </Table>
        </div>
        <h2 class="cardCounterIndicator">
            Количество игроков: {Object.values($manualStore.cards).reduce(
                (partialSum, a) => partialSum + a,
                0
            )}
        </h2>
        <div class="buttons">
            <Button clickEvent={onDistributionComplieted}>Подтвердить</Button>
            <Button color="secondary" clickEvent={() => navigateTo("/home")}
                >Назад</Button
            >
        </div>
    </Container>
</Layout>

<style>
    .roles {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
    }
    .buttons {
        width: 90%;
    }
    .cardCountInput {
        width: 3rem;
        color: #6f6f6f;
        background-color: transparent;
        border: none;
        font-size: 1.5rem;
        text-align: center;
        transition: 0.3s ease-in-out all;
    }
    .cardCountInput.activeCard {
        color: #eeeef5;
    }
    .changeCardCountBtn {
        font-size: 1.5rem;
        color: #eeeef5;
        background-color: #3f3d5e;
        border: none;
        padding: 3px 15px;
        border-radius: 8px;
    }
    .cardCounterColumn {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .cardCounterIndicator {
        margin: 20px 0;
        text-align: center;
    }
</style>
