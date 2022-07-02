export const cards = {
    mafia: {
        icon: "assets/icon.png",
        name: "Мафия",
        description: "Описание...",
    },
    civilian: {
        icon: "assets/icon.png",
        name: "Мирный житель",
        description: "Описание...",
    },
    doctor: {
        icon: "assets/icon.png",
        name: "Доктор",
        description: "Описание...",
    },
    commissioner: {
        icon: "assets/icon.png",
        name: "Коммиссар",
        description: "Описание...",
    },
    exmafia: {
        icon: "assets/icon.png",
        name: "Дон мафии",
        description: "Описание...",
    },
    maniac: {
        icon: "assets/icon.png",
        name: "Маньяк",
        description: "Описание...",
    },
    prostitute: {
        icon: "assets/icon.png",
        name: "Путана",
        description: "Описание...",
    },
    boss: {
        icon: "assets/icon.png",
        name: "Босс",
        description: "Описание...",
    },
    yakuza: {
        icon: "assets/icon.png",
        name: "Якудза",
        description: "Описание...",
    },
    thief: {
        icon: "assets/icon.png",
        name: "Вор",
        description: "Описание...",
    },
};

export function allCardsList() {
    return Object.assign(
        {},
        cards,
        JSON.parse(localStorage.getItem("customRoles"))
    );
}
