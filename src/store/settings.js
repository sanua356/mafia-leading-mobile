import { get, writable } from "svelte/store";
import * as idb from "../utils/indexeddb.js";
import { notificationStore } from "./notification";
import { allCardsList, updateAllCardsList } from "./../constants/cards";

const initialStore = {
    initialSetupFlag: false, //Флаг "первоначальной настройки" приложения (нужен для показа меню первой настройки)
    hiddeningCardsFlag: false, //Флаг скрытия карт с экрана (false - по клику, true - по таймеру)
    hiddeningCardsFlagTimer: 5, //Количество секунд, после которых карта при выдаче автоматически скроется (только при hiddeningCardsFlag = true)
    menuViewFlag: false, //Флаг показа/скрытия меню по свайпу
    deathZoneSwipe: 25, //Мертвая зопа свайпов (в процентах ширины экрана)
    viewIconsCards: true, //Флаг показа/скрытия иконок ролей при выдаче карт
    viewDescriptionCards: true, //Флаг показа/скрытия описания ролей при выдаче карт
    disableAnimationsFlag: false, //Флаг отключения анимаций и переходов в приложении
};

function initStore() {
    if (localStorage.getItem("settings") !== null) {
        return {
            ...initialStore,
            ...JSON.parse(localStorage.getItem("settings")),
            menuViewFlag: false,
        };
    } else {
        return initialStore;
    }
}

function createStore() {
    const { set, update, subscribe } = writable(initStore());

    return {
        update,
        subscribe,
        //Сбросить все настройки к заводским
        resetAllSettings: () => {
            set({ ...initialStore });
            settingsStore.saveSettingsInLocalStorage();
            localStorage.removeItem("history");
            localStorage.removeItem("customRoles");
            localStorage.removeItem("presets");
        },
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
        //Изменить значение таймера, после которого будут скрываться карты во время выдачи
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
        //Изменить флаг "первого запуска" приложения
        changeInitialSetupFlag: (value) => {
            update((prev) => {
                return {
                    ...prev,
                    initialSetupFlag: value,
                };
            });
            settingsStore.saveSettingsInLocalStorage();
        },
        //Изменить мертвую зону свайпов (значение то 10 до 90% ширины экрана)
        onChangeDeathZoneSwipe: (event) => {
            update((prev) => {
                return {
                    ...prev,
                    deathZoneSwipe: event.target.value,
                };
            });
            settingsStore.saveSettingsInLocalStorage();
        },
        //Изменить флаг отображения картинок ролей во время выдачи
        onChangeViewIconsFlag: (e) => {
            update((prev) => {
                return {
                    ...prev,
                    viewIconsCards: e.target.checked,
                };
            });
            settingsStore.saveSettingsInLocalStorage();
        },
        //Изменить флаг отображения картинок ролей во время выдачи
        onChangeDisableAnimationsFlag: (e) => {
            update((prev) => {
                return {
                    ...prev,
                    disableAnimationsFlag: e.target.checked,
                };
            });
            settingsStore.saveSettingsInLocalStorage();
        },
        //Изменить флаг отображения описания ролей во время выдачи
        onChangeViewDescriptionsFlag: (e) => {
            update((prev) => {
                return {
                    ...prev,
                    viewDescriptionCards: e.target.checked,
                };
            });
            settingsStore.saveSettingsInLocalStorage();
        },
        //Сохранение кастом иконки для роли (key - название роли)
        saveCustomIcon: (key, file) => {
            return idb.convertImageToBase64(file, (fileData) => {
                return idb.setValue(
                    key,
                    fileData,
                    "roles",
                    () => {
                        notificationStore.createNotification(
                            "Оповещение",
                            `Новая иконка для роли: ${allCardsList[key].name} успешно сохранена`
                        );
                        updateAllCardsList();
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
        //Удалить кастом роль из приложения
        deleteCustomRole: (key) => {
            if (localStorage.getItem("customRoles") === null) {
                return;
            }
            let rolesList = JSON.parse(localStorage.getItem("customRoles"));
            delete rolesList[key];
            localStorage.setItem("customRoles", JSON.stringify(rolesList));
        },
        //Изменить описание кастом роли
        changeDescriptionText: (text, key) => {
            let roles = JSON.parse(localStorage.getItem("customRoles"));
            if (roles[key].description !== text) {
                roles[key].description = text;
                localStorage.setItem("customRoles", JSON.stringify(roles));
                return true;
            } else {
                return false;
            }
        },
    };
}

export const settingsStore = createStore();
