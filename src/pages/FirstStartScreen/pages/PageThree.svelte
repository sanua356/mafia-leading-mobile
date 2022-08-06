<script>
    import Button from "../../../components/Button.svelte";
    import Layout from "../../../components/Layout.svelte";
    export let changePageEvent = () => {};
</script>

<Layout>
    <div class="container">
        <h2>Вызов меню</h2>
        <span style="margin-top: 35px;">
            Приложение поддерживает <strong>вызов меню по свайпу</strong>.
        </span>
        <span>
            Для вызова потяните палец с центральной части экрана вправо. Чтобы
            скрыть меню, потяните палец обратно.
        </span>
        <div class="swipesGif">
            <img src="../assets/monophy.gif" alt="Анимация свайпов" />
        </div>
        <div class="buttons">
            <Button
                style={"width: 100%;  margin-bottom: 15px;"}
                clickEvent={() => changePageEvent(4)}>Далее</Button
            >
            <Button
                color="secondary"
                style={"width: 100%;"}
                clickEvent={() => changePageEvent(2)}>Назад</Button
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
    .swipesGif img {
        max-width: 100%;
        height: auto;
    }
</style>
