import { writable, get } from "svelte/store";
import { allCardsList } from "./../constants/cards";

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
    });

    return {
        update,
        subscribe,
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
            let prevStore = get(selectedCardsStore).cards;
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
            let prevStore = get(selectedCardsStore).cards;
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
            let prevStore = get(selectedCardsStore).cards;
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
        //Предзагрузить массив карт для показа на экране
        preloadCardsInViewScreen: () => {
            const selectedCards = get(selectedCardsStore).cards;
            let viewedCards = [];
            const keys = Object.keys(selectedCards);
            for (let i = 0; i < keys.length; i++) {
                for (let j = 0; j < selectedCards[keys[i]]; j++) {
                    viewedCards.push(keys[i]);
                }
            }
            return viewedCards;
        },
        //Загрузить кастомный пак карт в хранилище (нужно например для загрузки из пресета). Фомрмат объекта: {mafia: 2, doctor: 1, ...}
        loadCustomCardsList: (customCardsPack) => {
            selectedCardsStore.reinit();
            update((prev) => {
                return {
                    ...prev,
                    cards: { ...prev.cards, ...customCardsPack },
                };
            });
        },
    };
}

export const selectedCardsStore = createStore();
