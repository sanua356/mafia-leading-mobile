<script>
    import Table from "../../../components/Table.svelte";
    import Setting from "../Setting.svelte";
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";

    let customRoles = [];
    onMount(() => {
        if (localStorage.getItem("customRoles") !== null) {
            customRoles = Object.entries(
                JSON.parse(localStorage.getItem("customRoles"))
            );
        }
    });

    function onDeleteCustomRole(key) {
        if (localStorage.getItem("customRoles") === null) {
            return;
        }
        let rolesList = JSON.parse(localStorage.getItem("customRoles"));
        delete rolesList[key];
        localStorage.setItem("customRoles", JSON.stringify(rolesList));
        customRoles = Object.entries(rolesList);
    }
</script>

<Setting>
    <h2>Пользовательские роли:</h2>
    <p>
        Эта настройка позволяет взаимодействовать с параметрами ролей, которые
        ведущий добавил в приложение самостоятельно.
    </p>
    {#if customRoles.length > 0}
        <Table style="margin-top: 20px;">
            <thead>
                <th align="left">Название карты</th>
                <th align="right">Действия</th>
            </thead>
            {#each customRoles as role}
                <tr transition:fly={{ y: 100, duration: 200 }}>
                    <td class="cardName">{role[1].name}</td>
                    <td align="right" class="actions">
                        <div class="customRoleButtons">
                            <button
                                class="customRolesDeleteBtn"
                                on:click={() => onDeleteCustomRole(role[0])}
                            >
                                Удалить
                            </button>
                            <button class="customRolesChangeDescBtn">
                                Изменить описание
                            </button>
                            <button class="customRolesChangeIconBtn">
                                Изменить иконку
                            </button>
                        </div>
                    </td>
                </tr>
            {/each}
        </Table>
    {:else}
        <span style="margin-top:15px; margin-bottom:10px;">
            В приложение не добавлено ещё ни одной пользовательской роли
        </span>
    {/if}
</Setting>

<style>
    th {
        font-size: 1.1rem;
    }
    td {
        font-size: 1rem;
    }

    .actions button {
        color: #eeeef5;
        border: none;
        border-radius: 5px;
        padding: 5px 8px;
        margin-bottom: 10px;
    }
    @media screen and (min-width: 600px) and (max-width: 1440px) {
        .actions button {
            padding: 5px 15px;
            font-size: 1rem;
        }
    }
    .customRolesDeleteBtn {
        background-color: #ff002f;
    }
    .customRolesChangeDescBtn {
        background-color: #3f3d5e;
    }
    .customRolesChangeIconBtn {
        background-color: #ff002f;
    }
</style>
