<script>
    import { onMount } from "svelte";
    import { navigateTo } from "svelte-router-spa";
    import Button from "../components/Button.svelte";
    import Input from "../components/Input.svelte";
    import Modal from "../components/Modal.svelte";
    import ModalContainer from "../components/ModalContainer.svelte";
    import { autoDistribStore } from "../store/autodistrib.js";
    import { selectedCardsStore } from "../store/selectedCards";
    import DistributionPreview from "./DistributionPreview.svelte";

    let modalFlag = true; //Флаг статуса показа модалки с выбором количества пользователей
    let errorFlag = false; //Флаг статуса показа ошибки некорректного ввода количества игроков

    function onSavePlayers() {
        if (
            $autoDistribStore.playersCount.toString() > 0 &&
            Number($autoDistribStore.playersCount) >= 1
        ) {
            errorFlag = false;
            modalFlag = false;
            autoDistribStore.calculateDistribution();
        } else {
            errorFlag = true;
        }
    }

    onMount(() => {
        selectedCardsStore.reinit();
    });
</script>

<Modal showFlag={$autoDistribStore.playersCount <= 0 || modalFlag}>
    <ModalContainer customStyle="padding: 5px 30px 25px 30px;">
        <div class="modalArea buttons">
            <label for="playersCount">Количество игроков</label>
            <Input
                id="playersCount"
                type="number"
                value={$autoDistribStore.playersCount}
                onChange={autoDistribStore.onChangePlayersCount}
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

<DistributionPreview />
