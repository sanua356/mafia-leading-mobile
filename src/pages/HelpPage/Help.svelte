<script>
    import Container from "../../components/Container.svelte";
    import Layout from "../../components/Layout.svelte";
    import Modal from "../../components/Modal.svelte";
    import ModalContainer from "../../components/ModalContainer.svelte";

    import DistributionInstruction from "./Instructions/distributionInstruction.svelte";

    let modalFlag = false,
        helpSection = "distributionInstruction";

    function onClickSection(sectionName) {
        modalFlag = true;
        helpSection = sectionName;
    }
</script>

<Layout>
    <Container>
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
    </Container>
</Layout>

{#if modalFlag}
    <Modal clickEvent={() => (modalFlag = false)}>
        <ModalContainer
            customStyle="padding: 10px 20px; max-height: 80vh;"
            clickEvent={(e) => e.stopPropagation()}
        >
            {#if helpSection === "distributionInstruction"}
                <DistributionInstruction />
            {/if}
        </ModalContainer>
    </Modal>
{/if}

<style>
    .sections {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .sections button {
        color: #eeeef5;
        font-size: 1rem;
        padding: 7px 15px;
        border: none;
        background: #3f3d5e;
        border-radius: 5px;
        margin-bottom: 10px;
    }
</style>
