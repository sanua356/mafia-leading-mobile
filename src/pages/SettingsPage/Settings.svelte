<script>
    import Container from "../../components/Container.svelte";
    import Layout from "../../components/Layout.svelte";
    import CustomRoles from "./SettingsList/CustomRoles.svelte";
    import DeathZoneSwipe from "./SettingsList/DeathZoneSwipes.svelte";
    import DisableTransitions from "./SettingsList/DisableTransitions.svelte";
    import HiddeningDistributionCards from "./SettingsList/HiddeningDistributionCards.svelte";
    import ResetAllSettings from "./SettingsList/ResetAllSettings.svelte";
    import RoleDetailsDistribution from "./SettingsList/RoleDetailsDistribution.svelte";
</script>

<Layout>
    <Container>
        <h1>Настройки</h1>
        <hr />
        <div class="settingsArea">
            <DeathZoneSwipe />
            <HiddeningDistributionCards />
            <DisableTransitions />
            <RoleDetailsDistribution />
            <CustomRoles />
            <ResetAllSettings />
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
