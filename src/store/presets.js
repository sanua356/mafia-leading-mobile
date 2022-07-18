import { get, writable } from "svelte/store";
import { manualStore } from "./manualdistrib.js";

function createStore() {
    const { update, subscribe } = writable({
        presets: JSON.parse(localStorage.getItem("presets")) || [],
    });

    return {
        update,
        subscribe,
        createPreset: (name) => {
            const savedPresets = localStorage.getItem("presets") || [];
            const cardsPreset = get(manualStore).cards;
            savedPresets.push({ name, cards: cardsPreset });
            localStorage.setItem("presets", JSON.stringify(savedPresets));
        },
    };
}

export const presetsStore = createStore();
