<script>
    import Button from "../../../components/Button.svelte";
    import Layout from "../../../components/Layout.svelte";
    import { settingsStore } from "../../../store/settings";
    export let changePageEvent = () => {};

    function confirmInitialSetup() {
        settingsStore.changeInitialSetupFlag(true);
    }
</script>

<Layout>
    <div class="container">
        <h2>Готово!</h2>
        <span style="margin-top: 35px;">
            <strong>Поздравляем!</strong> <br /> Начальная настройка приложения успешно
            завершена. Приятного пользования!
        </span>

        <div class="confirmSetup">
            <img
                src="../assets/confirmInitialSetup.png"
                alt="Анимация свайпов"
            />
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
    </div>
</Layout>

<style>
    .container {
        width: 100%;
        min-height: 100vh;
        overflow-y: auto;
        padding: 5%;
        margin: 0 auto;
    }
    @media screen and (min-width: 768px) {
        .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 70%;
        }
    }
    .container h2 {
        font-size: 1.5rem;
    }
    .container span {
        margin-bottom: 10px;
        font-size: 1.1rem;
    }
    @media screen and (min-width: 441px) {
        .buttons {
            justify-content: center;
        }
    }
    @media screen and (min-width: 768px) {
        .buttons {
            justify-content: center;
        }
    }
    .confirmSetup {
        margin-top: 25px;
        flex: 1 1 auto;
    }
    .confirmSetup img {
        max-width: 100%;
        height: auto;
    }
</style>
