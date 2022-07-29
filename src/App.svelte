<script>
    import { Router } from "svelte-router-spa";
    import Notification from "./components/Notification.svelte";
    import SwipeMenu from "./pages/SwipeMenu.svelte";
    import { routes } from "./routes/routes";
</script>

<Router {routes} />
<SwipeMenu />
<Notification />
