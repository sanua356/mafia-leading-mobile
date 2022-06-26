<script>
    import { navigateTo } from "svelte-router-spa";
    import Button from "../components/Button.svelte";
    import Layout from "../components/Layout.svelte";
</script>

<Layout>
    <h1>УПС</h1>
    <p>
        Вы попали на страницу, функции для которой ещё в разработке. Пожалуйста
        вернитесь на главную.
    </p>
    <Button clickEvent={navigateTo("/")}>На главную</Button>
</Layout>

<style>
</style>
