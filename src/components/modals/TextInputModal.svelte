<script>
    import Button from "../Button.svelte";
    import Input from "../Input.svelte";
    import Modal from "../Modal.svelte";
    import ModalContainer from "../ModalContainer.svelte";

    export let showFlag = false,
        labelName = "",
        inputValue = "",
        changeInputEvent = () => {},
        confirmBtnText = "Подтвердить",
        confirmBtnEvent = () => {},
        backBtnText = "Назад",
        backBtnEvent = () => {},
        errorFlag = false,
        errorText = "",
        inputType = "text";
</script>

<Modal {showFlag}>
    <ModalContainer customStyle="padding: 5px 30px 25px 30px;">
        <div class="modalArea buttons">
            <label for="playersCount">{labelName}</label>
            <Input
                id="playersCount"
                type={inputType}
                value={inputValue}
                onChange={changeInputEvent}
                style="margin-bottom: 15px;"
            />
            <Button clickEvent={confirmBtnEvent} style="font-size: 1rem;"
                >{confirmBtnText}</Button
            >
            <Button
                clickEvent={backBtnEvent}
                style="font-size: 1rem;"
                color="secondary">{backBtnText}</Button
            >
        </div>
        <span class="modalError {errorFlag && 'modalShow'}">
            {errorText}
        </span>
    </ModalContainer>
</Modal>
