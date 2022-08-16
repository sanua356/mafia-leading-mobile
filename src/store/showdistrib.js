import { get, writable } from "svelte/store";
import { notificationStore } from "./notification";

function createStore() {
    const { set, subscribe, update } = writable({
        cardsHiddened: [],
        cardsOpened: [],
        distributionDate: 0,
        applicationLoaded: false, //Флаг загрузки приложения (нужен для фикса бага Cordova)
    });

    return {
        subscribe,
        update,
        //Смена флага загрузки приложения во время инициализации Cordova
        applicationLoaded: (value) => {
            update((prev) => {
                return {
                    ...prev,
                    applicationLoaded: value,
                };
            });
        },
        //Перемешивание карт для выдачи
        shuffleCards: (cards) => {
            let suffledCards = cards;
            for (let i = 0; i < 100; i++) {
                suffledCards.sort(() => Math.random() - 0.5);
            }
            //Загрузка массива карт в store для показа игрокам
            set({ cardsHiddened: suffledCards, cardsOpened: [] });
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
            notificationStore.createNotification(
                "Оповещение",
                "Карта возвращена в ротацию на выдачу"
            );
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
    };
}

export const mainStore = createStore();
