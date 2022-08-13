<script>
    import { Router } from "svelte-router-spa";
    import Notification from "./components/Notification.svelte";
    import FirstStart from "./pages/FirstStartScreen/FirstStart.svelte";
    import SwipeMenu from "./pages/SwipeMenu.svelte";
    import { routes } from "./routes/routes.js";
    import { settingsStore } from "./store/settings.js";
</script>

<Router {routes} />
<SwipeMenu />
<Notification />
{#if !$settingsStore.initialSetupFlag}
    <FirstStart />
{/if}
