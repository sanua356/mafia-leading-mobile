import { writable, get } from "svelte/store";

function createStore() {
    const { update, subscribe } = writable({
        menuViewFlag: false,
        deathZoneSwipe: 5,
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
    };
}

export const swipeMenuStore = createStore();
