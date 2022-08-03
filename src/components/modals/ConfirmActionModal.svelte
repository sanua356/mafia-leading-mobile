<script>
    import Button from "../Button.svelte";
    import Modal from "../Modal.svelte";
    import ModalContainer from "../ModalContainer.svelte";

    export let title = "",
        showFlag = false,
        confirmBtnText = "Подтвердить",
        confirmBtnEvent = () => {},
        backBtnText = "Назад",
        backBtnEvent = () => {};
</script>

<Modal {showFlag}>
    <ModalContainer>
        <div class="modalArea buttons">
            <h2>{title}</h2>
            <Button clickEvent={confirmBtnEvent} style="font-size: 1rem;"
                >{confirmBtnText}</Button
            >
            <Button
                clickEvent={backBtnEvent}
                style="font-size: 1rem;"
                color="secondary">{backBtnText}</Button
            >
        </div>
    </ModalContainer>
</Modal>

<style>
    .modalArea {
        margin: 0;
        padding: 7%;
    }
    .modalArea h2 {
        text-align: center;
        margin-bottom: 20px;
    }
</style>
