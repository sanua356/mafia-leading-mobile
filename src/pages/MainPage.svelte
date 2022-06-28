<script>
    import { navigateTo } from "svelte-router-spa";
    import Layout from "../components/Layout.svelte";
    import Button from "../components/Button.svelte";
    import { swipeMenuStore } from "../store/swipemenu.js";
</script>

<Layout>
    <div class="info">
        <h1>Мафия</h1>
        <span>Приложение для ведущего в карточной игре - мафия</span>
        <Button
            style={"margin-bottom: 20px;"}
            clickEvent={() => navigateTo("home")}>Начнём!</Button
        >
        <Button
            clickEvent={() => {
                swipeMenuStore.changeViewFlag(!$swipeMenuStore.menuViewFlag);
            }}
            color="secondary"
            >Настройки
        </Button>
    </div>
</Layout>

<style>
    .info {
        max-width: 80%;
        z-index: 2;
        color: #eeeef5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .info h1 {
        font-size: 5.2rem;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
    .info span {
        opacity: 0.5;
        margin-bottom: 50px;
    }
</style>
