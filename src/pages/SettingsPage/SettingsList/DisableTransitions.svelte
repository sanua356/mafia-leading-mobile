<script>
    import Setting from "../Setting.svelte";
    import { settingsStore } from "../../../store/settings.js";
    import SwitchButton from "../../../components/SwitchButton.svelte";
</script>

<Setting>
    <h2>Отключение анимаций:</h2>
    <div class="roleDetailsSetting">
        <span class:disabled={!$settingsStore.disableAnimationsFlag}>
            Отключить отображение анимаций и переходов
        </span>
        <SwitchButton
            labelName="disableAnimations"
            checked={$settingsStore.disableAnimationsFlag}
            onChange={settingsStore.onChangeDisableAnimationsFlag}
        />
    </div>
    <p class="mt-10">
        Если у вас слабое устройство, отключение анимаций позволит существенно
        ускорить работу приложения. Сейчас анимации:
        {#if $settingsStore.disableAnimationsFlag}
            ВЫКЛЮЧЕНЫ
        {:else}
            ВКЛЮЧЕНЫ
        {/if}
    </p>
</Setting>

<style>
    .mt-10 {
        margin-top: 10px;
    }
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
