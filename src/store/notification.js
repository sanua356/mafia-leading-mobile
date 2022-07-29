import { writable } from "svelte/store";
function createStore() {
    const { update, set, subscribe } = writable({
        title: "",
        message: "",
    });

    return {
        update,
        subscribe,
        //Создать оповещение (показать его на экране)
        createNotification: (title, message) => {
            set({ title, message });
        },
    };
}

export const notificationStore = createStore();
