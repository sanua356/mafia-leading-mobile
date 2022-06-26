import { writable, get } from "svelte/store";
import { cards } from "./../constants/cards";

function initStore() {
    let initialStore = {};
    Object.keys(cards).forEach((card) => {
        initialStore[card] = 0;
    });
    return initialStore;
}

function createStore() {
    const { update, subscribe } = writable({
        cards: initStore(),
    });

    return {
        subscribe,
        update,
        onCardCountChanged: (cardName, event) => {
            let prevStore = get(manualStore).cards;

            if (
                event.target.value.toString().length > 0 &&
                Number(event.target.value) > 0
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
    };
}

export const manualStore = createStore();
