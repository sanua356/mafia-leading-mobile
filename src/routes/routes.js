import MainPage from "../pages/MainPage.svelte";
import HomePage from "../pages/HomePage.svelte";
import Page404 from "../pages/404.svelte";
import AutoDistributionPage from "../pages/AutoDistribution.svelte";
import ManualDistributionPage from "../pages/ManualDistribution.svelte";
import ShowDistributionPage from "../pages/ShowDistribution.svelte";
import PreviewDistiributionPage from "../pages/DistributionPreview.svelte";
import HistoryDistributionPage from "../pages/HistoryDistribution.svelte";
import SettingsPage from "../pages/SettingsPage/Settings.svelte";
import HelpPage from "../pages/HelpPage/Help.svelte";
import RulesPage from "../pages/Rules.svelte";
import PresetsPage from "../pages/Presets.svelte";
import NotesPage from "../pages/Notes.svelte";

export const routes = [
    {
        name: "/",
        component: MainPage,
    },
    {
        name: "home",
        component: HomePage,
    },
    {
        name: "404",
        path: "404",
        component: Page404,
    },
    {
        name: "auto-distribution",
        component: AutoDistributionPage,
    },
    {
        name: "manual-distribution",
        component: ManualDistributionPage,
    },
    {
        name: "show-distribution",
        component: ShowDistributionPage,
    },
    {
        name: "preview-distribution",
        component: PreviewDistiributionPage,
    },
    {
        name: "history",
        component: HistoryDistributionPage,
    },
    {
        name: "settings",
        component: SettingsPage,
    },
    {
        name: "help",
        component: HelpPage,
    },
    {
        name: "rules",
        component: RulesPage,
    },
    {
        name: "presets",
        component: PresetsPage,
    },
    {
        name: "notes",
        component: NotesPage,
    },
];
