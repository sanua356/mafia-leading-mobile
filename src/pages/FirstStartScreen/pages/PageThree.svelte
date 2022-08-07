<script>
    import Button from "../../../components/Button.svelte";
    import PageContainer from "../PageContainer.svelte";
    export let changePageEvent = () => {};
</script>

<PageContainer>
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
</PageContainer>

<style>
    span {
        margin-bottom: 10px;
        font-size: 1.1rem;
    }
    .swipesGif img {
        max-width: 100%;
        height: auto;
    }
</style>
