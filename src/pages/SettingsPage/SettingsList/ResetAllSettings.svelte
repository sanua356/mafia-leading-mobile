<script>
    import Setting from "../Setting.svelte";
    import { settingsStore } from "../../../store/settings.js";
    import { notificationStore } from "../../../store/notification";
    import Button from "../../../components/Button.svelte";
    import ConfirmActionModal from "../../../components/modals/ConfirmActionModal.svelte";
    import { navigateTo } from "svelte-router-spa";

    //Модалка с подтверждением сброса всех настроек к заводским
    let modalParams = {
        showFlag: false,
        title: "Вы точно хотите сбросить все настройки?",
        confirmBtnText: "Подтвердить",
        confirmBtnEvent: onResetSettings,
        backBtnEvent: () => {
            modalParams.showFlag = false;
        },
    };

    function onResetSettings() {
        settingsStore.resetAllSettings();
        notificationStore.createNotification(
            "Оповещение",
            "Все настройки приложения успешно сброшены"
        );
        navigateTo("/");
    }
</script>

<Setting>
    <h2>Сброс к заводским настройкам:</h2>
    <p>
        Эта настройка позволяет сбросить все параметры приложения к заводским.
        Обратите внимание, во время использования этой настройки удаляются также
        все пользовательские роли и очищается история игр.
    </p>
    <div class="buttons">
        <Button
            style={"width:100%;"}
            clickEvent={() => {
                modalParams.showFlag = true;
            }}
        >
            Сброс всех настроек
        </Button>
    </div>
</Setting>

<ConfirmActionModal {...modalParams} />
