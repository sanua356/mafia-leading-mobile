import { writable } from "svelte/store";

function createStore() {
    const { update, subscribe } = writable({
        presets: JSON.parse(localStorage.getItem("presets")) || [],
    });

    return {
        update,
        subscribe,
        createPreset: (name, cards) => {
            const savedPresets =
                JSON.parse(localStorage.getItem("presets")) || [];
            savedPresets.push({ name, cards });
            localStorage.setItem("presets", JSON.stringify(savedPresets));
        },
        deletePreset: (idx) => {
            const savedPresets =
                JSON.parse(localStorage.getItem("presets")) || [];
            savedPresets.splice(idx, 1);
            localStorage.setItem("presets", JSON.stringify(savedPresets));
        },
    };
}

export const presetsStore = createStore();
