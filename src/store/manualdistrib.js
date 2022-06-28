import { writable, get } from "svelte/store";
import { cards } from "./../constants/cards";
import CyrillicToTranslit from "cyrillic-to-translit-js";

const cyrillicToTranslit = new CyrillicToTranslit();

function initStore() {
    let initialStore = {};
    Object.keys(cards).forEach((card) => {
        initialStore[card] = 0;
    });
    if (localStorage.getItem("customRoles") !== null) {
        const customRoles = JSON.parse(localStorage.getItem("customRoles"));
        Object.keys(customRoles).forEach((card) => {
            initialStore[card] = 0;
        });
    }

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
        reinit: () => {
            update((prev) => {
                return {
                    ...prev,
                    cards: initStore(),
                };
            });
        },
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
        loadCardsFromAutoDistribution: (autoCards) => {
            manualStore.reinit();
            let prevStore = get(manualStore).cards;
            const entries = Object.entries(cards);
            const autoCardsEntries = Object.entries(autoCards);
            for (let i = 0; i < autoCardsEntries.length; i++) {
                for (let j = 0; j < entries.length; j++) {
                    if (
                        entries[j][1].toLowerCase() ===
                        autoCardsEntries[i][0].toLowerCase()
                    ) {
                        prevStore[entries[j][0]] = autoCardsEntries[i][1];
                    }
                }
            }
            update((prev) => {
                return {
                    ...prev,
                    cards: prevStore,
                };
            });
        },
        clearCustomRoleField: () => {
            update((prev) => {
                return {
                    ...prev,
                    newRoleName: "",
                };
            });
        },
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
                    savedCustomRoles[storageRoleName] = newRoleName;
                    localStorage.setItem(
                        "customRoles",
                        JSON.stringify(savedCustomRoles)
                    );
                    return true;
                }
            } else {
                let savedRole = {};
                savedRole[storageRoleName] = newRoleName;
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
