<script>
    import { onMount } from "svelte";
    import { navigateTo } from "svelte-router-spa";
    import Button from "../components/Button.svelte";
    import Layout from "../components/Layout.svelte";
    import { mainStore } from "../store/showdistrib.js";

    onMount(() => {
        if ($mainStore.applicationLoaded === false) {
            navigateTo("/");
            mainStore.applicationLoaded(true);
        }
    });
</script>

<Layout customStyles="flex-direction: column; text-align: center;">
    <h1>УПС</h1>
    <p>
        Вы попали на страницу, функции для которой ещё в разработке. Пожалуйста
        вернитесь на главную.
    </p>
    <Button clickEvent={() => navigateTo("/")}>На главную</Button>
</Layout>

<style>
    h1,
    p {
        max-width: 90%;
        color: #eeeef5;
    }
    h1 {
        font-size: 4rem;
        margin-bottom: 20px;
    }
    p {
        opacity: 0.7;
        font-size: 1.2rem;
        margin-bottom: 30px;
    }
</style>
