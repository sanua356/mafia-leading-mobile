import { get, writable } from "svelte/store";
import { cards } from "./../constants/cards";

function createStore() {
    const { subscribe, update } = writable({
        playersCount: 6,
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
            for (let i = 0; i <= Math.floor(playersCount / 3.5); i++) {
                cards.push("mafia");
                playersCount--;
            }
            if (cards.length >= 3) {
                for (let i = 0; i < Math.floor(cards.length / 3); i++) {
                    cards.pop();
                    cards.unshift("exmafia");
                }
            }
            //Добавление "комиссара" в раздачу
            for (let i = 0; i < Math.floor(playersCount / 4); i++) {
                cards.push("commissioner");
            }
            //Проверка на то, хватает ли игроков для добавления роли "Доктор"
            for (let i = 0; i < Math.floor(playersCount / 4); i++) {
                cards.push("doctor");
                playersCount--;
            }
            //Дозагрузка всех оставшихся карт как "мирные жители"
            for (let i = 0; i < playersCount; i++) {
                cards.push("civilian");
            }

            //Обновление store созданной колодой
            update((prev) => {
                return { ...prev, cards };
            });
        },
        //Подсчёт количества карт каждого наминала в JSON например: {"mafia": 2}
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
        //
        loadCardsManual: (cardsObj) => {
            let cardsArray = [];
            Object.keys(cardsObj).forEach((cardName) => {
                for (let i = 0; i < cardsObj[cardName]; i++) {
                    cardsArray.push(cardName);
                }
            });
            update((prev) => {
                return { ...prev, cards: cardsArray };
            });
        },
        //onChange на Input количества игроков автораздатчика
        onChangePlayersCount(e) {
            update((prev) => {
                return {
                    ...prev,
                    playersCount: e.target.value,
                };
            });
        },
        //Обнуление store
        reset: () => {
            update((prev) => {
                return { ...prev, cards: [] };
            });
        },
    };
}

export const store = createStore();
