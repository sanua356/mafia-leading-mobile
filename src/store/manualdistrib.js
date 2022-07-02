import { writable, get } from "svelte/store";
import { allCardsList, cards } from "./../constants/cards";
import CyrillicToTranslit from "cyrillic-to-translit-js";

//Подгрузка библиотеки транслитерации (для добавления кастом ролей)
const cyrillicToTranslit = new CyrillicToTranslit();

//Инициализация store с дефолными и пользовательскими картами
function initStore() {
    let initialStore = {};
    Object.keys(allCardsList()).forEach((card) => {
        initialStore[card] = 0;
    });

    return initialStore;
}

function createStore() {
    const { update, subscribe } = writable({
        cards: initStore(),
        newRoleName: "",
    });

    return {
        subscribe,
        update,
        //Переинициализация списка карт в store (нужно, когда пользователь добавил новую роль для обновления state)
        reinit: () => {
            update((prev) => {
                return {
                    ...prev,
                    cards: initStore(),
                };
            });
        },
        //onChange на Inputы, где пользователь выбирает количество карт конкретной роли
        onCardCountChanged: (cardName, event) => {
            let prevStore = get(manualStore).cards;

            if (
                event.target.value.toString().length > 0 &&
                Number(event.target.value) > 0 &&
                Number(event.target.value) <= 100
            ) {
                prevStore[cardName] = Number(event.target.value);
            } else {
                prevStore[cardName] = 0;
            }
            update((prev) => {
                return {
                    ...prev,
                    cards: prevStore,
                };
            });
        },
        //Добавляет единичку к Input с картой роли. Например количество мафий: 2(1 была + 1 добавится сейчас)
        incrementCardCount: (cardName) => {
            let prevStore = get(manualStore).cards;
            prevStore[cardName] = Number(prevStore[cardName]) + 1;
            update((prev) => {
                return {
                    ...prev,
                    cards: prevStore,
                };
            });
        },
        //Удаляет единичку к Input с картой роли. Например количество мафий: 2(1 была - 1 удалится сейчас)
        decrementCardCount: (cardName) => {
            let prevStore = get(manualStore).cards;
            if (prevStore[cardName] > 0) {
                prevStore[cardName] = Number(prevStore[cardName]) - 1;
                update((prev) => {
                    return {
                        ...prev,
                        cards: prevStore,
                    };
                });
            }
        },
        //Загрузка карт из ручного режима, если пользователь захотел изменить пак автонабора
        loadCardsFromAutoDistribution: (autoCards) => {
            manualStore.reinit();
            let prevStore = { ...get(manualStore).cards, ...autoCards };
            update((prev) => {
                return {
                    ...prev,
                    cards: prevStore,
                };
            });
        },
        //Очистка поля "имени" при добавлении кастом роли на модалке
        clearCustomRoleField: () => {
            update((prev) => {
                return {
                    ...prev,
                    newRoleName: "",
                };
            });
        },
        //onChange на Input ввода имени при добавлении кастом роли на модалке
        onChangeNameCustomRole: (e) => {
            if (String(e.target.value).trim().length > 0) {
                update((prev) => {
                    return {
                        ...prev,
                        newRoleName: String(e.target.value).trim(),
                    };
                });
            }
        },
        //Добавление кастом роли в хранилище
        createCustomRole: () => {
            const newRoleName = get(manualStore).newRoleName;
            let storageRoleName = cyrillicToTranslit
                .transform(newRoleName, "_")
                .toLowerCase();
            if (localStorage.getItem("customRoles") !== null) {
                let savedCustomRoles = JSON.parse(
                    localStorage.getItem("customRoles")
                );
                if (savedCustomRoles.hasOwnProperty(storageRoleName)) {
                    return false;
                } else {
                    savedCustomRoles[storageRoleName] = {
                        name: newRoleName,
                        icon: "",
                        description: "",
                    };
                    localStorage.setItem(
                        "customRoles",
                        JSON.stringify(savedCustomRoles)
                    );
                    return true;
                }
            } else {
                let savedRole = {};
                (savedRole[storageRoleName] = {
                    name: newRoleName,
                    icon: "",
                    description: "",
                }),
                    localStorage.setItem(
                        "customRoles",
                        JSON.stringify({ ...savedRole })
                    );
                return true;
            }
        },
    };
}

export const manualStore = createStore();
