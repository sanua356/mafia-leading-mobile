<script>
    import Button from "../../../components/Button.svelte";
    import { settingsStore } from "../../../store/settings";
    import PageContainer from "../PageContainer.svelte";
    export let changePageEvent = () => {};

    function confirmInitialSetup() {
        settingsStore.changeInitialSetupFlag(true);
    }
</script>

<PageContainer>
    <h2>Готово!</h2>
    <span style="margin-top: 35px;">
        <strong>Поздравляем!</strong> <br /> Начальная настройка приложения успешно
        завершена. Приятного пользования!
    </span>

    <div class="confirmSetup">
        <img src="../assets/confirmInitialSetup.png" alt="Анимация свайпов" />
    </div>
    <div class="buttons">
        <Button
            style={"width: 100%;  margin-bottom: 15px;"}
            clickEvent={confirmInitialSetup}>Готово</Button
        >
        <Button
            color="secondary"
            style={"width: 100%;"}
            clickEvent={() => changePageEvent(3)}>Назад</Button
        >
    </div>
</PageContainer>

<style>
    .confirmSetup {
        margin-top: 25px;
        flex: 1 1 auto;
    }
    .confirmSetup img {
        max-width: 100%;
        height: auto;
    }
</style>
