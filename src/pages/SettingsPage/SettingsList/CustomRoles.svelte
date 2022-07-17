<script>
    import Table from "../../../components/Table.svelte";
    import Setting from "../Setting.svelte";
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";
    import Modal from "../../../components/Modal.svelte";
    import ModalContainer from "../../../components/ModalContainer.svelte";
    import Input from "../../../components/Input.svelte";
    import Button from "../../../components/Button.svelte";
    import Textarea from "../../../components/Textarea.svelte";
    import Transition from "../../../components/Transition.svelte";

    let customRoles = [];
    let changeDescriptionParams = {
        viewFlag: false,
        inputValue: "",
        key: "",
    };

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

    function onChangeDescriptionRole(key) {
        changeDescriptionParams.viewFlag = true;
        if (localStorage.getItem("customRoles") !== null) {
            let roles = JSON.parse(localStorage.getItem("customRoles"));
            changeDescriptionParams.inputValue = String(roles[key].description);
        } else {
            changeDescriptionParams.inputValue = "";
        }
        changeDescriptionParams.key = key;
    }
    function onSaveDescription() {
        let roles = JSON.parse(localStorage.getItem("customRoles"));
        roles[changeDescriptionParams.key].description =
            changeDescriptionParams.inputValue;
        localStorage.setItem("customRoles", JSON.stringify(roles));
        changeDescriptionParams.viewFlag = false;
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
                            <button
                                class="customRolesChangeDescBtn"
                                on:click={() => {
                                    onChangeDescriptionRole(role[0]);
                                }}
                            >
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

<Modal showFlag={changeDescriptionParams.viewFlag}>
    <ModalContainer customStyle="padding: 5px 30px 25px 30px;">
        <div class="modalArea buttons">
            <h2 class="settingTitle">Изменить описание</h2>
            <Textarea
                rows="5"
                value={changeDescriptionParams.inputValue}
                onChange={(e) =>
                    (changeDescriptionParams.inputValue = e.target.value)}
                style="margin-bottom: 15px;"
            />
            <Button clickEvent={onSaveDescription} style="font-size: 1rem;"
                >Сохранить</Button
            >
            <Button
                clickEvent={() => {
                    changeDescriptionParams.viewFlag = false;
                }}
                style="font-size: 1rem;"
                color="secondary">Назад</Button
            >
        </div>
        <span
            class="modalError {changeDescriptionParams.inputValue.length ===
                0 &&
                changeDescriptionParams.inputValue.length > 255 &&
                'modalShow'}"
        >
            Описание должно иметь не менее 1 и не более 255 символов.
        </span>
    </ModalContainer>
</Modal>

<style>
    .settingTitle {
        font-size: 1.5rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        margin-bottom: 15px;
    }
    th {
        font-size: 1.1rem;
    }
    td {
        font-size: 1.1rem;
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
