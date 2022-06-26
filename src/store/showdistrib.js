import { get, writable } from "svelte/store";

function createStore() {
    const { set, subscribe, update } = writable({
        cardsHiddened: [],
        cardsOpened: [],
    });

    return {
        subscribe,
        update,
        loadCards: (cards) => {
            //Перемешивание массива карт
            let currentIndex = cards.length,
                randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                [cards[currentIndex], cards[randomIndex]] = [
                    cards[randomIndex],
                    cards[currentIndex],
                ];
            }

            //Загрузка массива карт в store для показа игрокам
            set({ cardsHiddened: cards, cardsOpened: [] });
        },
        //Сохранить уже открытые карты в массиве вскрытых карт
        pushToHistoryDistribution: (card) => {
            const cards = get(mainStore).cardsOpened;
            update((prev) => {
                return {
                    ...prev,
                    cardsOpened: [...cards, card],
                };
            });
        },
        deleteOpenedCard: (card) => {
            const cards = get(mainStore).cardsHiddened;
            cards.shift();
            update((prev) => {
                return {
                    ...prev,
                    cardsHiddened: cards,
                };
            });
        },
        returnOpenedCardInRotation: () => {
            const hiddened = get(mainStore).cardsHiddened;
            const opened = get(mainStore).cardsOpened;
            update((prev) => {
                return {
                    ...prev,
                    cardsHiddened: [opened[opened.length - 1], ...hiddened],
                };
            });
        },
    };
}

export const mainStore = createStore();
