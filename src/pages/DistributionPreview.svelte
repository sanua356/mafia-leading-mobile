<script>
    import { navigateTo } from "svelte-router-spa";
    import Button from "../components/Button.svelte";
    import Container from "../components/Container.svelte";
    import Layout from "../components/Layout.svelte";
    import Table from "../components/Table.svelte";
    import { allCardsList } from "../constants/cards";
    import { mainStore } from "../store/showdistrib.js";
    import { selectedCardsStore } from "../store/selectedCards.js";

    function onDistributionCards() {
        mainStore.shuffleCards(selectedCardsStore.preloadCardsInViewScreen());
        navigateTo("show-distribution");
    }
</script>

<Layout>
    <Container>
        <div>
            <h1>Ваша колода</h1>
            <hr />
        </div>
        <div class="table">
            <Table>
                <thead>
                    <th align="left">Название карты</th>
                    <th align="right">Количество</th>
                </thead>
                {#each Object.entries($selectedCardsStore.cards) as [key, value]}
                    {#if value > 0}
                        <tr
                            ><td
                                >{allCardsList()[key]?.name ||
                                    "Неизвестная роль"}</td
                            ><td align="right">{value}</td></tr
                        >
                    {/if}
                {/each}
            </Table>
        </div>

        <div class="buttons customButtons">
            <Button
                clickEvent={() => navigateTo("manual-distribution")}
                style="font-size: 1rem;"
                color="secondary">Изменить раздачу</Button
            >
        </div>
        <div class="buttons">
            <Button clickEvent={onDistributionCards} style="font-size: 1rem;"
                >Раздать</Button
            >
            <Button
                style="font-size: 1rem;"
                color="secondary"
                clickEvent={() => navigateTo("/home")}>Назад</Button
            >
        </div>
    </Container>
</Layout>

<style>
    .table {
        flex: 1 1 auto;
    }
    .buttons {
        width: 80%;
    }
    .customButtons {
        justify-content: center !important;
    }
</style>
