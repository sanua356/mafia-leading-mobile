<script>
    import Layout from "../components/Layout.svelte";
    import Button from "../components/Button.svelte";
    import { navigateTo } from "svelte-router-spa";
</script>

<Layout>
    <div class="selectTypeDistribution">
        <h1>Выберите тип раздачи</h1>
        <Button
            style={"margin-bottom: 20px;"}
            clickEvent={() => navigateTo("manual-distribution")}
            color="secondary"
            >Ручная
        </Button>
        <Button
            style={"margin-bottom: 20px;"}
            clickEvent={() => navigateTo("auto-distribution")}
            >Автоматическая
        </Button>
        <Button
            style={"margin-bottom: 20px;"}
            clickEvent={() => navigateTo("presets")}
            color="secondary"
            >Пресеты
        </Button>
    </div>
</Layout>

<style>
    .selectTypeDistribution {
        color: #eeeef5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        padding: 0 20px;
    }
    .selectTypeDistribution h1 {
        max-width: 90%;
        font-size: 2rem;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 30px;
        letter-spacing: 2px;
    }
</style>
