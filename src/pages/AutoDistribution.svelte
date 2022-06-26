<script>
    import { navigateTo } from "svelte-router-spa";

    import { onMount } from "svelte/internal";
    import Button from "../components/Button.svelte";
    import Input from "../components/Input.svelte";
    import Modal from "../components/Modal.svelte";
    import { store } from "../store/autodistrib.js";
    import { manualStore } from "../store/manualdistrib";
    import DistributionPreview from "./DistributionPreview.svelte";

    onMount(() => {
        store.reset();
    });
    let modalFlag = true; //Флаг статуса показа модалки с выбором количества пользователей
    let errorFlag = false; //Флаг статуса показа ошибки некорректного ввода количества игроков

    function onSavePlayers() {
        if (
            $store.playersCount.toString() > 0 &&
            Number($store.playersCount) >= 1
        ) {
            errorFlag = false;
            modalFlag = false;
            store.calculateDistribution();
            store.calculateCardsCount();
        } else {
            errorFlag = true;
        }
    }

    function onChangeDistribution() {
        manualStore.loadCardsFromAutoDistribution($store.cardsCount);
        navigateTo("manual-distribution");
    }
</script>

{#if $store.playersCount <= 0 || modalFlag}
    <Modal>
        <div class="modalArea">
            <div class="playersCountArea buttons">
                <label for="playersCount">Количество игроков</label>
                <Input
                    id="playersCount"
                    type="number"
                    value={$store.playersCount}
                    onChange={store.onChangePlayersCount}
                    style="margin-bottom: 15px;"
                />
                <Button clickEvent={onSavePlayers} style="font-size: 1rem;"
                    >Сохранить</Button
                >
                <Button
                    clickEvent={() => navigateTo("/home")}
                    style="font-size: 1rem;"
                    color="secondary">Назад</Button
                >
            </div>
            <span class="error {errorFlag && 'show'}">
                Недопустимое число игроков. Введите корректное число.
            </span>
        </div>
    </Modal>
{/if}

<DistributionPreview backBtnEvent={() => (modalFlag = true)}>
    <Button
        clickEvent={onChangeDistribution}
        style="font-size: 1rem;"
        color="secondary">Изменить раздачу</Button
    >
</DistributionPreview>

<style>
    .modalArea {
        color: #eeeef5;
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding: 5px 30px 25px 30px;
        background-color: #27263b;
        border-radius: 10px;
    }
    .playersCountArea {
        width: 100%;
    }
    .playersCountArea label {
        display: block;
        font-size: 1.3rem;
        margin-bottom: 10px;
    }
    .error {
        display: none;
        margin-top: 15px;
        color: rgb(201 19 19);
        font-size: 1.2rem;
    }
    .show {
        display: block !important;
        text-align: center;
    }
</style>
