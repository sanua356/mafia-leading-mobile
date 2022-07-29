<script>
    import { fly } from "svelte/transition";
    import Button from "../components/Button.svelte";
    import Container from "../components/Container.svelte";
    import Input from "../components/Input.svelte";
    import Layout from "../components/Layout.svelte";
    import Modal from "../components/Modal.svelte";
    import ModalContainer from "../components/ModalContainer.svelte";
    import Table from "../components/Table.svelte";
    import { allCardsList } from "../constants/cards";
    import ManualDistribution from "../pages/ManualDistribution.svelte";
    import { manualStore } from "../store/manualdistrib.js";
    import { presetsStore } from "../store/presets.js";
    import { store } from "../store/autodistrib.js";
    import { navigateTo } from "svelte-router-spa";
    import { notificationStore } from "../store/notification";

    let createPresetFlag = false; //Флаг создания пресета (чтобы переключить окно со списка пресетов на селектор ролей)
    let presetNameModalFlag = false,
        presetName = "",
        errorFlag = false; //Флаг модалки ввода названия пресета

    let presetDetails = { viewFlag: false, idxPreset: 0 }; //Переменная модалки с инфо о пресете (кол-во ролей)
    let deletePreset = { viewFlag: false, idxPreset: 0 }; //Переменная модалки с подтверждением удаления пресета

    //Загрузить список уже существующих пресетов
    let savedPresets = JSON.parse(localStorage.getItem("presets")) || [];
    function updateSavedPresets() {
        savedPresets = JSON.parse(localStorage.getItem("presets")) || [];
    }

    //Вызов селектора выбора ролей для создания пресета
    function onCreatePreset() {
        errorFlag = false;
        if (presetName.length > 0 && presetName.length < 255) {
            presetNameModalFlag = false;
            createPresetFlag = true;
        } else {
            errorFlag = true;
        }
    }

    //Сохранение пресета в хранилище
    function onSavePreset() {
        presetsStore.createPreset(presetName, $manualStore.cards);
        createPresetFlag = false;
        presetName = "";
        manualStore.reinit();
        updateSavedPresets();
        notificationStore.createNotification("Оповещение", "Пресет создан");
    }

    //Удалить пресет по клику на кнопку внутри модалки
    function onDeletePreset() {
        presetsStore.deletePreset(deletePreset.idxPreset);
        deletePreset.viewFlag = false;
        deletePreset.idxPreset = 0;
        updateSavedPresets();
    }

    function viewModalDeletePreset(idx) {
        deletePreset.viewFlag = true;
        deletePreset.idxPreset = idx;
    }

    function viewModalInfoPreset(idx) {
        presetDetails.viewFlag = true;
        presetDetails.idxPreset = idx;
    }

    //Загрузить пресет на выдачу
    function onLoadPreset(idx) {
        store.loadCardsManual(savedPresets[idx].cards);
        store.calculateCardsCount();
        navigateTo("preview-distribution");
    }
</script>

{#if !createPresetFlag}
    <Layout>
        <Container>
            <div>
                <h1>Пресеты</h1>
                <hr />
                <div class="presets">
                    {#if savedPresets.length > 0}
                        <Table>
                            <thead>
                                <th align="left">Название</th>
                                <th align="right">Действия</th>
                            </thead>
                            {#each savedPresets as preset, idx}
                                <tr transition:fly={{ y: 100, duration: 200 }}>
                                    <td on:click={() => onLoadPreset(idx)}
                                        >{preset.name}</td
                                    >
                                    <td align="right">
                                        <button
                                            class="infoPresetBtn"
                                            on:click={() =>
                                                viewModalInfoPreset(idx)}
                                        >
                                            Инфо
                                        </button>
                                        <button
                                            class="deletePresetBtn"
                                            on:click={() =>
                                                viewModalDeletePreset(idx)}
                                        >
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        </Table>
                    {:else}
                        <p class="emptyPresets">
                            Вы ещё не создали ни одного пресета
                        </p>
                    {/if}
                    <div
                        class="addPresetBtn"
                        on:click={() => (presetNameModalFlag = true)}
                    >
                        Добавить новый пресет
                    </div>
                </div>
            </div>
        </Container>
    </Layout>
{:else}
    <ManualDistribution
        confirmBtnText="Создать пресет"
        confirmBtnEvent={onSavePreset}
    />
{/if}

<Modal showFlag={presetNameModalFlag}>
    <ModalContainer customStyle="padding: 5px 30px 25px 30px;">
        <div class="modalArea buttons">
            <label for="presetName">Название пресета</label>
            <Input
                id="presetName"
                type="text"
                value={presetName}
                onChange={(e) => (presetName = e.target.value)}
                style="margin-bottom: 15px;"
            />
            <Button clickEvent={onCreatePreset} style="font-size: 1rem;">
                Создать
            </Button>
            <Button
                clickEvent={() => (presetNameModalFlag = false)}
                style="font-size: 1rem;"
                color="secondary">Назад</Button
            >
        </div>
        <span class="modalError {errorFlag && 'modalShow'}">
            Название пресета должно содержать минимум 1 и максимум 255 символов.
        </span>
    </ModalContainer>
</Modal>

<Modal
    showFlag={presetDetails.viewFlag}
    clickEvent={() => (presetDetails.viewFlag = false)}
>
    <ModalContainer customStyle="padding: 5px 30px 25px 30px;">
        <div class="modalArea">
            <h2>Информация о ролях:</h2>
            <p>
                Здесь хранится информация о ролях, которые сохранены в выбранном
                вами пресете.
            </p>
            <nav>
                <ul>
                    {#each Object.entries(savedPresets[presetDetails.idxPreset].cards) as preset}
                        {#if preset[1] > 0}
                            <li>
                                {allCardsList()[preset[0]]?.name ||
                                    "Неизвестная роль"} : {preset[1]} шт.
                            </li>
                        {/if}
                    {/each}
                </ul>
            </nav>
        </div>
    </ModalContainer>
</Modal>

<Modal showFlag={deletePreset.viewFlag}>
    <ModalContainer>
        <div class="modalArea buttons deletePresetModalArea">
            <h2>Вы точно хотите удалить пресет?</h2>
            <Button clickEvent={onDeletePreset} style="font-size: 1rem;"
                >Удалить</Button
            >
            <Button
                clickEvent={() => (deletePreset.viewFlag = false)}
                style="font-size: 1rem;"
                color="secondary">Назад</Button
            >
        </div>
    </ModalContainer>
</Modal>

<style>
    .emptyPresets {
        font-size: 1.4rem;
        text-align: center;
        margin: 30px 0;
    }
    .addPresetBtn {
        font-size: 1.3rem;
        display: block;
        width: 100%;
        text-align: center;
        padding: 20px 0;
        margin: 20px 0;
        border: 2px dashed gray;
        opacity: 0.6;
        transition: 0.3s ease-in-out all;
    }
    .presets button {
        color: #eeeef5;
        border: none;
        border-radius: 5px;
        padding: 5px 8px;
        margin-bottom: 10px;
    }
    .deletePresetBtn {
        background-color: #ff002f;
    }
    .infoPresetBtn {
        background-color: #3f3d5e;
    }

    .modalArea h2 {
        margin: 15px 0;
        font-size: 1.3rem;
    }
    .modalArea p {
        opacity: 0.7;
        margin-bottom: 15px;
    }
    .modalArea nav {
        margin-top: 10px;
    }
    .modalArea nav li {
        font-size: 1.1rem;
        margin-bottom: 10px;
        list-style-type: none;
    }
    .modalArea nav li::before {
        list-style-type: none;
        content: "●";
        margin-right: 10px;
    }

    .deletePresetModalArea {
        margin: 0;
        padding: 5%;
    }
</style>
