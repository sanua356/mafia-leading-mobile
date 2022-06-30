import { get, writable } from "svelte/store";

function createStore() {
    const { set, subscribe, update } = writable({
        cardsHiddened: [],
        cardsOpened: [],
        distributionDate: 0,
    });

    return {
        subscribe,
        update,
        //Перемешивание карт для выдачи
        shuffleCards: (cards) => {
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

        //Удалить из массива скрытых карт ту, которую сейчас при выдаче видит игрок
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
        //Вернуть карту в ротацию для показа (если игрок не успел посмотреть на свою роль)
        returnOpenedCardInRotation: () => {
            const hiddened = get(mainStore).cardsHiddened;
            let opened = get(mainStore).cardsOpened;
            const returnedCard = opened[opened.length - 1];
            opened.pop();
            update((prev) => {
                return {
                    ...prev,
                    cardsOpened: opened,
                    cardsHiddened: [returnedCard, ...hiddened],
                };
            });
            mainStore.saveDistributionInLocalStorage();
        },
        //Сохранить дату проведения раздачи (нужно для корректной работы "истории раздач")
        saveDistributionDate: () => {
            let d = new Date();
            let seconds = Math.round(d.getTime() / 1000);
            update((prev) => {
                return {
                    ...prev,
                    distributionDate: seconds,
                };
            });
        },
        //Сохранение текущей раздачи в хранилище
        saveDistributionInLocalStorage: () => {
            let history = [];
            const store = get(mainStore);
            if (localStorage.getItem("history") !== null) {
                history = JSON.parse(localStorage.getItem("history"));
                if (history[0].dateID === store.distributionDate) {
                    history[0] = {
                        dateID: store.distributionDate,
                        cardsOpened: store.cardsOpened,
                        cardsHiddened: store.cardsHiddened,
                    };
                } else {
                    if (Object.keys(history).length >= 100) {
                        history.pop();
                    }
                    history.unshift({
                        dateID: store.distributionDate,
                        cardsOpened: store.cardsOpened,
                        cardsHiddened: store.cardsHiddened,
                    });
                }
            } else {
                history.push({
                    dateID: store.distributionDate,
                    cardsOpened: store.cardsOpened,
                    cardsHiddened: store.cardsHiddened,
                });
            }
            localStorage.setItem("history", JSON.stringify(history));
        },
    };
}

export const mainStore = createStore();
