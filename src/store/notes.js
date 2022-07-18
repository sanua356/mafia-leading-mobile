import { get, writable } from "svelte/store";

function createStore() {
    const { set, update, subscribe } = writable({
        activeNight: 0,
        notesList: [],
    });

    return {
        update,
        subscribe,
        onChangeNote: (noteName, text) => {
            const notes = get(notesStore).notesList;
            const activeNight = get(notesStore).activeNight;
            if (notes[activeNight] === undefined) {
                notes[activeNight] = {};
            }
            notes[activeNight][noteName] = text;
            update((prev) => {
                return {
                    ...prev,
                    notesList: notes,
                };
            });
        },
        changeActiveNight: (newNightValue) => {
            update((prev) => {
                return {
                    ...prev,
                    activeNight: newNightValue,
                };
            });
        },
        clearAllNotes: () => {
            set({ activeNight: 0, notesList: [] });
        },
    };
}

export const notesStore = createStore();
