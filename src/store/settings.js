import { get, writable } from "svelte/store";

function createStore() {
    const { update, subscribe } = writable({
        hiddeningCardsFlag: false, //Флаг скрытия карт с экрана (false - по клику, true - по таймеру)
        hiddeningCardsFlagTimer: 5, //Количество секунд, после которых карта при выдаче автоматически скроется (только при hiddeningCardsFlag = true)
    });

    return {
        update,
        subscribe,
        //Сохранение всех настроек в хранилище
        saveSettingsInLocalStorage: () => {
            if (localStorage.getItem("settings") !== null) {
                const oldSettings = JSON.parse(
                    localStorage.getItem("settings")
                );
                console.log(get(settingsStore));
                localStorage.setItem(
                    "settings",
                    JSON.stringify({ ...oldSettings, ...get(settingsStore) })
                );
            } else {
                localStorage.setItem(
                    "settings",
                    JSON.stringify({ ...get(settingsStore) })
                );
            }
        },
        //onChange на Input смены типа скрытия карт (по клику или по таймеру)
        onChangeFlagHiddeningCards: (e) => {
            update((prev) => {
                return {
                    ...prev,
                    hiddeningCardsFlag: e.target.checked,
                };
            });
            settingsStore.saveSettingsInLocalStorage();
        },
        onChangeHiddeningCardsTimer: (e) => {
            if (Number(e.target.value) !== NaN) {
                update((prev) => {
                    return {
                        ...prev,
                        hiddeningCardsFlagTimer: e.target.value,
                    };
                });
                settingsStore.saveSettingsInLocalStorage();
            }
        },
    };
}

export const settingsStore = createStore();
