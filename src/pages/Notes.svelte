<script>
    import { notesStore } from "../store/notes.js";
    import Layout from "../components/Layout.svelte";
    import Container from "../components/Container.svelte";
    import Textarea from "../components/Textarea.svelte";
    import Modal from "../components/Modal.svelte";
    import ModalContainer from "../components/ModalContainer.svelte";
    import Button from "../components/Button.svelte";

    let clearFieldsModalFlag = false;

    function onClearFields() {
        notesStore.clearAllNotes();
        clearFieldsModalFlag = false;
    }
</script>

<Layout>
    <Container>
        <div>
            <h1>Заметки</h1>
            <hr />
        </div>
        <div class="notes">
            <div class="note">
                <h3>Мафия убила:</h3>
                <Textarea
                    value={$notesStore.notesList[$notesStore.activeNight]
                        ?.kills || ""}
                    onChange={(e) =>
                        notesStore.onChangeNote("kills", e.target.value)}
                />
            </div>
            <div class="note">
                <h3>Коммиссар проверил:</h3>
                <Textarea
                    value={$notesStore.notesList[$notesStore.activeNight]
                        ?.checks || ""}
                    onChange={(e) =>
                        notesStore.onChangeNote("checks", e.target.value)}
                />
            </div>
            <div class="note">
                <h3>Доктор вылечил:</h3>
                <Textarea
                    value={$notesStore.notesList[$notesStore.activeNight]
                        ?.hills || ""}
                    onChange={(e) =>
                        notesStore.onChangeNote("hills", e.target.value)}
                />
            </div>
            <div class="note">
                <h3>Другое:</h3>
                <Textarea
                    value={$notesStore.notesList[$notesStore.activeNight]
                        ?.other || ""}
                    onChange={(e) =>
                        notesStore.onChangeNote("other", e.target.value)}
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
                    on:click={() => (clearFieldsModalFlag = true)}
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
    </Container>
</Layout>

<Modal showFlag={clearFieldsModalFlag}>
    <ModalContainer>
        <div class="modalArea buttons">
            <h2>Вы точно хотите очистить все поля?</h2>
            <Button clickEvent={onClearFields} style="font-size: 1rem;"
                >Очистить</Button
            >
            <Button
                clickEvent={() => (clearFieldsModalFlag = false)}
                style="font-size: 1rem;"
                color="secondary">Назад</Button
            >
        </div>
    </ModalContainer>
</Modal>

<style>
    .disabled {
        pointer-events: none;
        opacity: 0.5;
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

    .modalArea {
        margin: 0;
        padding: 7%;
    }
    .modalArea h2 {
        text-align: center;
        margin-bottom: 20px;
    }
</style>
