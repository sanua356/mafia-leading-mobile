<script>
    import { navigateTo } from "svelte-router-spa";
    import { onMount } from "svelte/internal";
    import Button from "../components/Button.svelte";
    import Input from "../components/Input.svelte";
    import Modal from "../components/Modal.svelte";
    import ModalContainer from "../components/ModalContainer.svelte";
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

<Modal showFlag={$store.playersCount <= 0 || modalFlag}>
    <ModalContainer customStyle="padding: 5px 30px 25px 30px;">
        <div class="modalArea buttons">
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
        <span class="modalError {errorFlag && 'modalShow'}">
            Недопустимое число игроков. Введите корректное число.
        </span>
    </ModalContainer>
</Modal>

<DistributionPreview backBtnEvent={() => (modalFlag = true)}>
    <Button
        clickEvent={onChangeDistribution}
        style="font-size: 1rem;"
        color="secondary">Изменить раздачу</Button
    >
</DistributionPreview>
