import * as idb from "../utils/indexeddb.js";

export const cards = {
    mafia: {
        icon: "assets/mafia2.png",
        name: "Мафия",
        description:
            "Просыпается каждую ночь и убивает одного из игроков. Цель: убить всех мирных игроков.",
    },
    civilian: {
        icon: "assets/civilian.png",
        name: "Мирный житель",
        description:
            "Самая частая роль для игроков. Не просыпается ночью. Цель: исключить голосованием всех мафиози.",
    },
    doctor: {
        icon: "assets/doctor.png",
        name: "Доктор",
        description:
            "Просыпается каждую ночь и лечит одного из игроков. Если мафиози и доктор выбрали одного и того же игрока, он выживает.",
    },
    commissioner: {
        icon: "assets/policeman.png",
        name: "Коммиссар",
        description:
            "Просыпается каждую ночь и проверяет одного из игроков, является ли игрок мафией. Цель: исключить голосованием всех мафиози.",
    },
    exmafia: {
        icon: "assets/bandit.png",
        name: "Дон мафии",
        description:
            "Просыпается каждую ночь и проверяет одного из игроков, является ли игрок комиссаром. Цель: убить всех мирных игроков.",
    },
    maniac: {
        icon: "assets/maniac.png",
        name: "Маньяк",
        description:
            "Просыпается каждую ночь (не одновременно с мафией) и убивает одного из игроков. Цель: остаться единственным выжившим.",
    },
    prostitute: {
        icon: "assets/woman.png",
        name: "Путана",
        description:
            "Просыпается каждую ночь и указывает на игрока, которого следующим днём нельзя будет исключить голосованием.",
    },
    boss: {
        icon: "assets/boss.png",
        name: "Босс",
        description:
            "Главный среди мафиози. Просыпается каждую ночь и убивает одного из игроков (если мафиози выбрали другого игрока, их выбор не учитывается).",
    },
    yakuza: {
        icon: "assets/tattoo.png",
        name: "Якудза",
        description:
            "Задача: истребить мирных жителей и мафию. Просыпается каждую ночь. В первую ночь договаривается об убийствах, а начиная со второй стреляет",
    },
    thief: {
        icon: "assets/thief.png",
        name: "Вор",
        description:
            "Играет за мирных жителей. Просыпается первым и лишает спецдействия одного из игроков. Таким образом игрок не может совершить действие ночью.",
    },
};

export const unknownCardIcon = "assets/anonymity.png";

let savedIcons = {};

export function reloadSavedIcons() {
    Object.keys(allCardsList()).forEach((key) => {
        idb.getValue(
            key,
            "roles",
            (icon) => {
                if (icon !== undefined) {
                    savedIcons[key] = { icon: icon.value };
                }
            },
            (e) => {
                console.error(e);
            }
        );
    });
}

export function allCardsList() {
    let allCards = Object.assign(
        {},
        cards,
        JSON.parse(localStorage.getItem("customRoles"))
    );
    Object.keys(savedIcons).forEach((key) => {
        allCards[key].icon = savedIcons[key]?.icon;
    });
    return allCards;
}
