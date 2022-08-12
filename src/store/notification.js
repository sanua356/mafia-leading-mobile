import { writable } from "svelte/store";

export const notificationTypes = { warning: "warning", error: "error" }; //enum с типами всех оповещений (влияют только на стилизацию)

function createStore() {
    const { update, set, subscribe } = writable({
        title: "",
        message: "",
        type: notificationTypes.warning,
    });

    return {
        update,
        subscribe,
        //Создать оповещение (показать его на экране)
        createNotification: (
            title,
            message,
            type = notificationTypes.warning
        ) => {
            set({ title, message, type });
        },
    };
}

export const notificationStore = createStore();
