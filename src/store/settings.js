import { get, writable } from "svelte/store";
import * as idb from "../utils/indexeddb.js";
import { notificationStore } from "./notification";

function initStore() {
    const initialStore = {
        hiddeningCardsFlag: false, //Флаг скрытия карт с экрана (false - по клику, true - по таймеру)
        hiddeningCardsFlagTimer: 5, //Количество секунд, после которых карта при выдаче автоматически скроется (только при hiddeningCardsFlag = true)
        menuViewFlag: false, //Флаг показа/скрытия меню по свайпу
        deathZoneSwipe: 25, //Мертвая зопа свайпов (в процентах ширины экрана)
        viewIconsCards: true, //Флаг показа/скрытия иконок ролей при выдаче карт
        viewDescriptionCards: true, //Флаг показа/скрытия описания ролей при выдаче карт
    };
    if (localStorage.getItem("settings") !== null) {
        return {
            ...initialStore,
            ...JSON.parse(localStorage.getItem("settings")),
        };
    } else {
        return initialStore;
    }
}

function createStore() {
    const { update, subscribe } = writable(initStore());

    return {
        update,
        subscribe,
        //Сохранение всех настроек в хранилище
        saveSettingsInLocalStorage: () => {
            if (localStorage.getItem("settings") !== null) {
                const oldSettings = JSON.parse(
                    localStorage.getItem("settings")
                );
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
            settingsStore.saveSettingsInLocalStorage();
        },
        onChangeViewIconsFlag: (e) => {
            update((prev) => {
                return {
                    ...prev,
                    viewIconsCards: e.target.checked,
                };
            });
            settingsStore.saveSettingsInLocalStorage();
        },
        onChangeViewDescriptionsFlag: (e) => {
            update((prev) => {
                return {
                    ...prev,
                    viewDescriptionCards: e.target.checked,
                };
            });
            settingsStore.saveSettingsInLocalStorage();
        },
        saveCustomIcon: (key, file) => {
            idb.convertImageToBase64(file, (fileData) => {
                idb.setValue(
                    key,
                    fileData,
                    "roles",
                    () => {
                        notificationStore.createNotification(
                            "Оповещение",
                            "Новая иконка для роли успешно сохранена"
                        );
                    },
                    (e) => {
                        notificationStore.createNotification(
                            "Внимание",
                            "Не удалось сохранить иконку для роли из-за непредвиденной ошибки. Попробуйте перезапустить приложение."
                        );
                    }
                );
            });
        },
    };
}

export const settingsStore = createStore();
