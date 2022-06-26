import { get, writable } from "svelte/store";
import { cards } from "./../constants/cards";

function createStore() {
    const { subscribe, update } = writable({
        playersCount: 1,
        cards: [],
        cardsCount: {},
    });

    return {
        subscribe,
        update,
        //Подсчёт колоды исходя из количества игроков
        calculateDistribution: () => {
            let playersCount = get(store).playersCount;
            let cards = [];
            //Подсчёт всех "мафий"
            for (let i = 0; i < Math.ceil(playersCount / 4); i++) {
                cards.push("Мафия");
            }
            playersCount -= Math.ceil(playersCount / 4);
            //Проверка на то, хватает ли игроков для добавления роли "Доктор"
            if (playersCount >= 4) {
                cards.push("Доктор");
                playersCount--;
            }
            //Добавление "комиссара" в раздачу
            if (playersCount > 0) {
                cards.push("Комиссар");
                playersCount--;
            }
            //Дозагрузка всех оставшихся карт как "мирные жители"
            for (let i = 0; i < playersCount; i++) {
                cards.push("Мирный житель");
            }

            //Обновление store созданной колодой
            update((prev) => {
                return { ...prev, cards };
            });
        },
        calculateCardsCount: () => {
            const cards = get(store).cards;
            const cardsCount = {};
            for (let i = 0; i < cards.length; i++) {
                if (cardsCount[cards[i]] === undefined) {
                    cardsCount[cards[i]] = 1;
                } else {
                    cardsCount[cards[i]]++;
                }
            }
            update((prev) => {
                return {
                    ...prev,
                    cardsCount,
                };
            });
        },
        loadCardsManual: (cardsObj) => {
            let cardsArray = [];
            Object.keys(cardsObj).forEach((cardName) => {
                for (let i = 0; i < cardsObj[cardName]; i++) {
                    cardsArray.push(cards[cardName]);
                }
            });
            console.log(cardsArray);
            update((prev) => {
                return { ...prev, cards: cardsArray };
            });
        },
        onChangePlayersCount(e) {
            update((prev) => {
                return {
                    ...prev,
                    playersCount: e.target.value,
                };
            });
        },
        reset: () => {
            update((prev) => {
                return { ...prev, cards: [] };
            });
        },
    };
}

export const store = createStore();
