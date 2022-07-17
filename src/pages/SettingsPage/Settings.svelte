<script>
    import Container from "../../components/Container.svelte";
    import Layout from "../../components/Layout.svelte";
    import CustomRoles from "./SettingsList/CustomRoles.svelte";
    import DeathZoneSwipe from "./SettingsList/DeathZoneSwipes.svelte";
    import HiddeningDistributionCards from "./SettingsList/HiddeningDistributionCards.svelte";
    import RoleDetailsDistribution from "./SettingsList/RoleDetailsDistribution.svelte";
</script>

<Layout>
    <Container>
        <h1>Настройки</h1>
        <hr />
        <div class="settingsArea">
            <DeathZoneSwipe />
            <HiddeningDistributionCards />
            <RoleDetailsDistribution />
            <CustomRoles />
        </div>
    </Container>
</Layout>

<style>
    .settingsArea {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
