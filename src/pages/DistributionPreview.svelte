<script>
    import { navigateTo } from "svelte-router-spa";
    import Button from "../components/Button.svelte";
    import Container from "../components/Container.svelte";
    import Layout from "../components/Layout.svelte";
    import Table from "../components/Table.svelte";
    import { allCardsList } from "../constants/cards";
    import { store } from "../store/autodistrib.js";
    import { mainStore } from "../store/showdistrib.js";

    function onDistributionCards() {
        mainStore.shuffleCards($store.cards);
        navigateTo("show-distribution");
    }

    export let backBtnEvent = () => navigateTo("manual-distribution");
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
                {#each Object.entries($store.cardsCount) as [key, value]}
                    <tr
                        ><td
                            >{allCardsList()[key]?.name ||
                                "Неизвестная роль"}</td
                        ><td align="right">{value}</td></tr
                    >
                {/each}
            </Table>
        </div>

        <div class="buttons customButtons">
            <slot />
        </div>
        <div class="buttons">
            <Button clickEvent={onDistributionCards} style="font-size: 1rem;"
                >Раздать</Button
            >
            <Button
                style="font-size: 1rem;"
                color="secondary"
                clickEvent={backBtnEvent}>Назад</Button
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
