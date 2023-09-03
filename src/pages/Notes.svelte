<script>
    import Container from "../components/Container.svelte"
    import Layout from "../components/Layout.svelte"
    import Textarea from "../components/Textarea.svelte"
    import Transition from "../components/Transition.svelte"
    import ConfirmActionModal from "../components/modals/ConfirmActionModal.svelte"
    import { notesStore } from "../store/notes.js"
    import { notificationStore } from "../store/notification.js"

    //Параметры модалки для подтверджения очистки всех полей ввода заметок
    let modalParams = {
        showFlag: false,
        title: "Вы точно хотите очистить все поля?",
        confirmBtnText: "Очистить",
        confirmBtnEvent: onClearFields,
        backBtnEvent: () => {
            modalParams.showFlag = false;
        },
    };

    function onClearFields() {
        notesStore.clearAllNotes();
        modalParams.showFlag = false;
        notificationStore.createNotification(
            "Оповещение",
            "Все текстовые поля успешно очищены"
        );
    }

    //Флаг анимации перелистывания заметок
    let showFlag = true;

    //Сигнал смены номера дня
    $: onDayChanged = $notesStore.activeNight;

    $: {
        if (onDayChanged + 1) {
            showFlag = false;
            setTimeout(() => {
                showFlag = true;
            }, 300);
        }
    }
</script>

<Layout>
    <Container style={"overflow: hidden;"}>
        <div>
            <h1>Заметки</h1>
            <hr />
        </div>
        <Transition
            {showFlag}
            mountClass={"noteMounted"}
            unmountClass={"noteUnmounted"}
            unmountDuration={200}
        >
            <div class="notesContainer">
                <div class="notes">
                    <div class="note">
                        <h3>Мафия убила:</h3>
                        <Textarea
                            value={$notesStore.notesList[
                                $notesStore.activeNight
                            ]?.kills || ""}
                            onChange={(e) =>
                                notesStore.onChangeNote(
                                    "kills",
                                    e.target.value
                                )}
                        />
                    </div>
                    <div class="note">
                        <h3>Коммиссар проверил:</h3>
                        <Textarea
                            value={$notesStore.notesList[
                                $notesStore.activeNight
                            ]?.checks || ""}
                            onChange={(e) =>
                                notesStore.onChangeNote(
                                    "checks",
                                    e.target.value
                                )}
                        />
                    </div>
                    <div class="note">
                        <h3>Доктор вылечил:</h3>
                        <Textarea
                            value={$notesStore.notesList[
                                $notesStore.activeNight
                            ]?.hills || ""}
                            onChange={(e) =>
                                notesStore.onChangeNote(
                                    "hills",
                                    e.target.value
                                )}
                        />
                    </div>
                    <div class="note">
                        <h3>Другое:</h3>
                        <Textarea
                            value={$notesStore.notesList[
                                $notesStore.activeNight
                            ]?.other || ""}
                            onChange={(e) =>
                                notesStore.onChangeNote(
                                    "other",
                                    e.target.value
                                )}
                        />
                    </div>
                </div>
                <div class="actions">
                    <span class="activeNight"
                        >Текущая ночь: {$notesStore.activeNight}</span
                    >
                    <div class="prevNextButtons">
                        <button
                            class="prevBtn"
                            class:disabled={$notesStore.activeNight === 0}
                            on:click={() =>
                                notesStore.changeActiveNight(
                                    $notesStore.activeNight - 1
                                )}
                        >
                            {`<`}
                        </button>
                        <button
                            class="clearAllFields"
                            on:click={() => (modalParams.showFlag = true)}
                            >Очистить все поля</button
                        >
                        <button
                            class="nextBtn"
                            class:disabled={$notesStore.activeNight >= 100}
                            on:click={() =>
                                notesStore.changeActiveNight(
                                    $notesStore.activeNight + 1
                                )}
                        >
                            {`>`}
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Container>
</Layout>

<ConfirmActionModal {...modalParams} />

<style>
    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }
    .notesContainer {
        transition: 0.2s ease-in-out all;
        transform: translateX(20%);
        opacity: 0;
    }
    :global(.noteMounted) {
        transform: translateX(0) !important;
        opacity: 1 !important;
    }
    :global(.noteUnmounted) {
        transform: translateX(-20%) !important;
        opacity: 0 !important;
    }
    .notes {
        flex: 1 1 auto;
    }
    :global(.note textarea) {
        background-color: #3f3d5e !important;
        width: 100% !important;
    }
    .note {
        margin-bottom: 20px;
    }
    .note h3 {
        font-size: 1.2rem;
        margin-bottom: 10px;
    }
    .actions {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        padding: 5%;
    }
    .activeNight {
        font-size: 1.5rem;
        margin-bottom: 20px;
    }
    .prevNextButtons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .prevBtn,
    .nextBtn {
        max-width: fit-content;
        font-size: 1.8rem;
        padding: 10px 20px;
        color: white;
        background-color: #3f3d5e;
        border: none;
        border-radius: 5px;
    }
    .clearAllFields {
        margin: 0 10px;
        padding: 12px 15px;
        font-size: 1.3rem;
        max-width: 100%;
        background-color: #ff002f;
        border: none;
        border-radius: 5px;
        color: white;
    }
</style>
