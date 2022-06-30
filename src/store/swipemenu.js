import { writable, get } from "svelte/store";

function loadDeathZoneInLocalStorage() {
    if (localStorage.getItem("settings") !== null) {
        const settings = JSON.parse(localStorage.getItem("settings"));
        if (settings.deathZone !== undefined) {
            return settings.deathZone;
        }
    }
    return 25;
}

function createStore() {
    const { update, subscribe } = writable({
        menuViewFlag: false,
        deathZoneSwipe: loadDeathZoneInLocalStorage(),
    });

    return {
        subscribe,
        update,
        changeViewFlag: (value) => {
            update((prev) => {
                return {
                    ...prev,
                    menuViewFlag: value,
                };
            });
        },
        changeDeathZoneSwipe: (value) => {
            if (localStorage.getItem("settings") !== null) {
                let settings = localStorage.getItem("settings");
                settings.deathZone = value;
                localStorage.setItem("settings", JSON.stringify(settings));
            } else {
                localStorage.setItem(
                    "settings",
                    JSON.stringify({ deathZone: value })
                );
            }
            update((prev) => {
                return {
                    ...prev,
                    deathZoneSwipe: value,
                };
            });
        },
    };
}

export const swipeMenuStore = createStore();
