import { get, writable } from "svelte/store";
import { selectedCardsStore } from "./selectedCards";

function createStore() {
    const { set, subscribe, update } = writable({
        playersCount: 6,
    });

    return {
        subscribe,
        update,
        //Подсчёт колоды исходя из количества игроков
        calculateDistribution: () => {
            let playersCount = get(autoDistribStore).playersCount;
            let mafiaCount = 0;
            //Подсчёт всех "мафий"
            for (let i = 0; i <= Math.floor(playersCount / 3.5); i++) {
                selectedCardsStore.incrementCardCount("mafia");
                playersCount--;
                mafiaCount++;
            }
            if (mafiaCount.length >= 3) {
                for (let i = 0; i < Math.floor(mafiaCount.length / 3); i++) {
                    mafiaCount--;
                    selectedCardsStore.decrementCardCount("mafia");
                    selectedCardsStore.incrementCardCount("exmafia");
                }
            }
            //Добавление "комиссара" в раздачу
            for (let i = 0; i < Math.floor(playersCount / 4); i++) {
                selectedCardsStore.incrementCardCount("commissioner");
                playersCount--;
            }
            //Проверка на то, хватает ли игроков для добавления роли "Доктор"
            for (let i = 0; i < Math.floor(playersCount / 4); i++) {
                selectedCardsStore.incrementCardCount("doctor");
                playersCount--;
            }
            //Дозагрузка всех оставшихся карт как "мирные жители"
            for (let i = 0; i < playersCount; i++) {
                selectedCardsStore.incrementCardCount("civilian");
            }
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
            set({ playersCount: 6 });
        },
    };
}

export const autoDistribStore = createStore();
