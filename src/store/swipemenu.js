import { writable, get } from "svelte/store";

//Загрузка кастом значения "мёртвой зоны" для свайпов (если значение есть в хранилище, иначе дефолтное = 25)
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
        //Изменить состояние флага показа меню на экране
        changeViewFlag: (value) => {
            update((prev) => {
                return {
                    ...prev,
                    menuViewFlag: value,
                };
            });
        },
        onChangeDeathZoneSwipe: (event) => {
            update((prev) => {
                return {
                    ...prev,
                    deathZoneSwipe: event.target.value,
                };
            });
            swipeMenuStore.changeDeathZoneSwipe(event.target.value);
        },
        //Добавить кастом значение "мёртвой зоны" для свайпов
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
