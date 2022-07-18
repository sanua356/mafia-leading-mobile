<script>
    import Container from "../../components/Container.svelte";
    import Layout from "../../components/Layout.svelte";
    import Modal from "../../components/Modal.svelte";
    import ModalContainer from "../../components/ModalContainer.svelte";

    import DistributionInstruction from "./Instructions/DistributionInstruction.svelte";
    import HistoryGamesInstruction from "./Instructions/HistoryGamesInstruction.svelte";
    import SettingsInstruction from "./Instructions/SettingsInstruction.svelte";
    import Contacts from "./Instructions/Contacts.svelte";

    let modalFlag = false,
        helpSection = "distributionInstruction";

    function onClickSection(sectionName) {
        modalFlag = true;
        helpSection = sectionName;
    }
</script>

<Layout>
    <Container>
        <div class="helpArea">
            <div>
                <h1>Помощь</h1>
                <hr />
            </div>
            <div class="sections">
                <button
                    type="button"
                    on:click={() => onClickSection("distributionInstruction")}
                    >1. Как раздать карты?</button
                >
                <button
                    type="button"
                    on:click={() => onClickSection("historyInstruction")}
                    >2. Описание функций истории игр</button
                >
                <button
                    type="button"
                    on:click={() => onClickSection("settingsInstruction")}
                    >3. Описание настроек приложения</button
                >
                <button
                    type="button"
                    on:click={() => onClickSection("developerContact")}
                    >4. Связь с разработчиком</button
                >
            </div>
            <span class="author">Alexander Pankratov. 2022</span>
        </div>
    </Container>
</Layout>

<Modal showFlag={modalFlag} clickEvent={() => (modalFlag = false)}>
    <ModalContainer
        customStyle="padding: 10px 20px; max-height: 80vh;"
        clickEvent={(e) => e.stopPropagation()}
    >
        {#if helpSection === "distributionInstruction"}
            <DistributionInstruction />
        {/if}
        {#if helpSection === "historyInstruction"}
            <HistoryGamesInstruction />
        {/if}
        {#if helpSection === "settingsInstruction"}
            <SettingsInstruction />
        {/if}
        {#if helpSection === "developerContact"}
            <Contacts />
        {/if}
    </ModalContainer>
</Modal>

<style>
    :global(.instruction) {
        overflow-y: auto;
    }
    .helpArea {
        display: flex;
        flex-direction: column;
        min-height: 95vh;
    }
    .sections {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1 1 auto;
    }
    .sections button {
        color: #eeeef5;
        font-size: 1rem;
        padding: 7px 15px;
        border: none;
        background: #3f3d5e;
        border-radius: 5px;
        margin-bottom: 10px;
        text-align: left;
        max-width: fit-content;
        word-break: break-all;
    }
    .author {
        text-align: center;
        margin: 20px 0;
        opacity: 0.3;
    }

    /*Стили для непосредственно компонент с инструкциями */
    :global(.instruction hr) {
        margin: 10px 0;
        height: 3px;
        background: #eeeef5;
        color: #eeeef5;
        border-radius: 5px;
        max-width: 30%;
    }
    :global(.instruction .link) {
        font-weight: 600;
        color: #eeeef5;
        border-bottom: 2px dashed;
        width: fit-content;
        padding-bottom: 2px;
    }
    :global(.instruction .m-10) {
        display: block;
        margin: 10px 0;
    }
    :global(.instruction .mt-20) {
        margin-top: 20px;
    }
    :global(.instruction .mb-10) {
        margin-bottom: 10px;
    }
    :global(.instruction h3) {
        margin-top: 30px;
        margin-bottom: 10px;
    }
    :global(.instruction p) {
        margin-bottom: 5px;
    }
    :global(.instruction aside) {
        font-weight: 600;
    }
    :global(.instruction nav) {
        margin-top: 10px;
    }
    :global(.instruction nav li) {
        margin-bottom: 5px;
    }
    :global(.instruction nav li::before) {
        list-style-type: none;
        content: "●";
        margin-right: 10px;
    }
</style>
