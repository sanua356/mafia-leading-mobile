<script>
    import { fly } from "svelte/transition";
    import Container from "../components/Container.svelte";
    import Layout from "../components/Layout.svelte";
    import Table from "../components/Table.svelte";
    import { allCardsList } from "../constants/cards";
    import ManualDistribution from "../pages/ManualDistribution.svelte";
    import { presetsStore } from "../store/presets.js";
    import { navigateTo } from "svelte-router-spa";
    import { notificationStore } from "../store/notification";
    import { selectedCardsStore } from "../store/selectedCards";
    import TextInputModal from "../components/modals/TextInputModal.svelte";
    import Modal from "../components/Modal.svelte";
    import ModalContainer from "../components/ModalContainer.svelte";
    import ConfirmActionModal from "../components/modals/ConfirmActionModal.svelte";

    //Загрузить список уже существующих пресетов
    let savedPresets = JSON.parse(localStorage.getItem("presets")) || [];
    function updateSavedPresets() {
        savedPresets = JSON.parse(localStorage.getItem("presets")) || [];
    }
    //Загрузить пресет на выдачу
    function onLoadPreset(idx) {
        selectedCardsStore.loadCustomCardsList(savedPresets[idx].cards);
        navigateTo("preview-distribution");
    }

    let createPresetFlag = false; //Флаг состояния создания пресета (если true - пользователь попадает на страницу выбора ролей для пресета)
    //Параметры модалки создания нового пресета
    let modalParamsCreatePreset = {
        showFlag: false,
        labelName: "Название пресета",
        inputValue: "",
        changeInputEvent: (e) =>
            (modalParamsCreatePreset.inputValue = e.target.value),
        confirmBtnText: "Сохранить",
        confirmBtnEvent: onCreatePreset,
        backBtnEvent: () => (modalParamsCreatePreset.showFlag = false),
        errorFlag: false,
        errorText:
            "Название пресета должно содержать минимум 1 и максимум 255 символов. Также нельзя создать два пресета с одинаковыми названиями",
    };

    //Вызов селектора выбора ролей для создания пресета
    function onCreatePreset() {
        let checkSamePresets = savedPresets.filter(
            (item) => item.name !== modalParamsCreatePreset.inputValue
        );
        modalParamsCreatePreset.errorFlag = false;
        if (
            modalParamsCreatePreset.inputValue.length > 0 &&
            modalParamsCreatePreset.inputValue.length < 255 &&
            checkSamePresets.length === savedPresets.length
        ) {
            modalParamsCreatePreset.showFlag = false;
            createPresetFlag = true;
        } else {
            modalParamsCreatePreset.errorFlag = true;
        }
    }

    //Сохранение пресета в хранилище
    function onSavePreset() {
        presetsStore.createPreset(
            modalParamsCreatePreset.inputValue,
            $selectedCardsStore.cards
        );
        createPresetFlag = false;
        modalParamsCreatePreset.inputValue = "";
        selectedCardsStore.reinit();
        updateSavedPresets();
        notificationStore.createNotification("Оповещение", "Пресет создан");
    }

    //Параметры показа модалки удаления пресета
    let modalParamsDeletePreset = {
        showFlag: false,
        title: "Вы точно хотите удалить пресет?",
        confirmBtnText: "Удалить",
        confirmBtnEvent: onDeletePreset,
        backBtnEvent: () => {
            modalParamsDeletePreset.showFlag = false;
        },
        idxPreset: 0,
    };

    //Удалить пресет по клику на кнопку внутри модалки
    function onDeletePreset() {
        presetsStore.deletePreset(modalParamsDeletePreset.idxPreset);
        modalParamsDeletePreset.showFlag = false;
        modalParamsDeletePreset.idxPreset = 0;
        updateSavedPresets();
    }

    function viewModalDeletePreset(idx) {
        modalParamsDeletePreset.showFlag = true;
        modalParamsDeletePreset.idxPreset = idx;
    }

    //Переменная модалки с инфо о пресете (кол-во ролей)
    let presetDetails = { showFlag: false, idxPreset: 0 };

    function viewModalInfoPreset(idx) {
        presetDetails.showFlag = true;
        presetDetails.idxPreset = idx;
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
                        on:click={() =>
                            (modalParamsCreatePreset.showFlag = true)}
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

<TextInputModal {...modalParamsCreatePreset} />
<ConfirmActionModal {...modalParamsDeletePreset} />
<Modal
    showFlag={presetDetails.showFlag}
    clickEvent={() => (presetDetails.showFlag = false)}
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
                                {allCardsList[preset[0]]?.name ||
                                    "Неизвестная роль"} : {preset[1]} шт.
                            </li>
                        {/if}
                    {/each}
                </ul>
            </nav>
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
</style>
