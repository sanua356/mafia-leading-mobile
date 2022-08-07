<script>
    import Setting from "../Setting.svelte";
    import { settingsStore } from "../../../store/settings.js";
    import SwitchButton from "../../../components/SwitchButton.svelte";
</script>

<Setting>
    <h2>Отображение информации о ролях:</h2>
    <div class="roleDetailsSetting">
        <span class:disabled={!$settingsStore.viewIconsCards}>
            Показывать картинки во время выдачи ролей
        </span>
        <SwitchButton
            labelName="disableIcons"
            checked={$settingsStore.viewIconsCards}
            onChange={settingsStore.onChangeViewIconsFlag}
        />
    </div>
    <div class="roleDetailsSetting">
        <span class:disabled={!$settingsStore.viewDescriptionCards}>
            Показывать описания к ролям во время выдачи
        </span>
        <SwitchButton
            labelName="disableDescription"
            checked={$settingsStore.viewDescriptionCards}
            onChange={settingsStore.onChangeViewDescriptionsFlag}
        />
    </div>
</Setting>

<style>
    .disabled {
        opacity: 0.6;
    }

    .roleDetailsSetting {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
    }
    .roleDetailsSetting > span {
        max-width: 80%;
    }
</style>
