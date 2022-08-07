<script>
    import { settingsStore } from "../../store/settings";
    import FinalPage from "./pages/FinalPage.svelte";
    import PageOne from "./pages/PageOne.svelte";
    import PageThree from "./pages/PageThree.svelte";
    import PageTwo from "./pages/PageTwo.svelte";

    //Выбранная страница, которая показывается в меню "первого запуска"
    let selectedPage = 1;
    function changePageEvent(page) {
        selectedPage = page;
    }
</script>

{#if !$settingsStore.initialSetupFlag}
    <div class="container">
        {#if selectedPage === 1}
            <PageOne {changePageEvent} />
        {:else if selectedPage === 2}
            <PageTwo {changePageEvent} />
        {:else if selectedPage === 3}
            <PageThree {changePageEvent} />
        {:else if selectedPage === 4}
            <FinalPage {changePageEvent} />
        {/if}
    </div>
{/if}

<style>
    .container {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        margin: auto;
        z-index: 999;
        width: 100vw;
        min-height: 100vh;
        overflow-y: auto;
        background: #22212f;
    }
</style>
