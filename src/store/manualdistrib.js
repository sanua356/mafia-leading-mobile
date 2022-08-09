import { writable, get } from "svelte/store";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import { updateAllCardsList } from "./../constants/cards";

//Подгрузка библиотеки транслитерации (для добавления кастом ролей)
const cyrillicToTranslit = new CyrillicToTranslit();

function createStore() {
    const { update, subscribe } = writable({
        newRoleName: "",
    });

    return {
        subscribe,
        update,
        //Очистка поля "имени" при добавлении кастом роли на модалке
        clearCustomRoleField: () => {
            update((prev) => {
                return {
                    ...prev,
                    newRoleName: "",
                };
            });
        },
        //onChange на Input ввода имени при добавлении кастом роли на модалке
        onChangeNameCustomRole: (e) => {
            if (String(e.target.value).trim().length > 0) {
                update((prev) => {
                    return {
                        ...prev,
                        newRoleName: String(e.target.value).trim(),
                    };
                });
            }
        },
        //Добавление кастом роли в хранилище
        createCustomRole: () => {
            const newRoleName = get(manualStore).newRoleName;
            let storageRoleName = cyrillicToTranslit
                .transform(newRoleName, "_")
                .toLowerCase();
            if (Number(storageRoleName) !== NaN) {
                storageRoleName = "role_" + storageRoleName;
            }
            if (localStorage.getItem("customRoles") !== null) {
                let savedCustomRoles = JSON.parse(
                    localStorage.getItem("customRoles")
                );
                if (savedCustomRoles.hasOwnProperty(storageRoleName)) {
                    return false;
                } else {
                    savedCustomRoles[storageRoleName] = {
                        name: newRoleName,
                        icon: "",
                        description: "",
                    };
                    localStorage.setItem(
                        "customRoles",
                        JSON.stringify(savedCustomRoles)
                    );
                    return true;
                }
            } else {
                let savedRole = {};
                (savedRole[storageRoleName] = {
                    name: newRoleName,
                    icon: "",
                    description: "",
                }),
                    localStorage.setItem(
                        "customRoles",
                        JSON.stringify({ ...savedRole })
                    );
                return true;
            }
        },
    };
}

export const manualStore = createStore();
