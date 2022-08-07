import { get, writable } from "svelte/store";
import { notificationStore } from "./notification";
import { mainStore } from "./showdistrib";

function initHistory() {
    return JSON.parse(localStorage.getItem("history")) || []; //Хранилище всех (100 последних) раздач
}

function createStore() {
    const { set, update, subscribe } = writable({
        history: initHistory(),
    });

    return {
        update,
        subscribe,
        //Преобразовать UNIX время в дату формата: ДД.ММ.ГГГГ
        createCurrentDate: (unixDate) => {
            let today = new Date(unixDate * 1000);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1;
            let dd = today.getDate();

            if (dd < 10) dd = "0" + dd;
            if (mm < 10) mm = "0" + mm;

            today = dd + "." + mm + "." + yyyy;
            return today;
        },
        //Преобразовать UNIX время в время формата: ЧЧ:ММ
        createCurrentTime: (unixDate) => {
            let today = new Date(unixDate * 1000);
            today =
                String(today.getHours()).padStart(2, "0") +
                ":" +
                String(today.getMinutes()).padStart(2, "0");
            return today;
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
            set({ history: history });
        },
        //Удалить игру из истории раздач по её индексу
        onDeleteGame: (idx) => {
            let history = get(historyDistribStore).history;
            let deleteGameInfo =
                historyDistribStore.createCurrentDate(history[idx].dateID) +
                " " +
                historyDistribStore.createCurrentTime(history[idx].dateID);
            history.splice(idx, 1);
            localStorage.setItem("history", JSON.stringify(history));
            if (history.length === 0) {
                localStorage.removeItem("history");
                history = [];
            } else {
                history = JSON.parse(localStorage.getItem("history"));
            }
            notificationStore.createNotification(
                "Оповещение",
                `Информация о раздаче с датой и временем: '${deleteGameInfo}' успешно удалена.`
            );
            set({ history: history });
        },
        //Удалить все раздачи из истории
        clearAllGames: () => {
            let history = get(historyDistribStore).history;
            localStorage.removeItem("history");
            history = [];
            notificationStore.createNotification(
                "Оповещение",
                "Вся история раздач очищена"
            );
            set({ history: [] });
        },
    };
}

export const historyDistribStore = createStore();
