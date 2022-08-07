<script>
    import Setting from "../Setting.svelte";
    import { settingsStore } from "../../../store/settings.js";
    import SwitchButton from "../../../components/SwitchButton.svelte";
</script>

<Setting>
    <h2>Скрытие карт во время выдачи:</h2>
    <div class="switchBtnArea">
        <span class:disabled={$settingsStore.hiddeningCardsFlag}>
            По клику на карту
        </span>
        <SwitchButton
            labelName={"changeHiddeningCardsType"}
            checked={$settingsStore.hiddeningCardsFlag}
            onChange={settingsStore.onChangeFlagHiddeningCards}
        />
        <span
            style="text-align: right;"
            class:disabled={!$settingsStore.hiddeningCardsFlag}
            >По истечению таймера</span
        >
    </div>
    {#if $settingsStore.hiddeningCardsFlag}
        <div class="timer">
            <label for="timerViewCard">Таймер:</label>
            <input
                type="number"
                id="timerViewCard"
                min="1"
                max="100"
                value={$settingsStore.hiddeningCardsFlagTimer}
                on:input={settingsStore.onChangeHiddeningCardsTimer}
            />
        </div>
        <p>
            Таймер показывает, через сколько секунд карта, которую игрок увидел,
            скроется
        </p>
    {/if}
</Setting>

<style>
    .disabled {
        opacity: 0.6;
    }
    .switchBtnArea {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }
    .timer {
        display: flex;
        align-items: center;
        width: 100%;
        margin-top: 35px;
        margin-bottom: 5px;
    }
    .timer input {
        width: 100%;
        margin-left: 10px;
        border: none;
        background-color: #3f3d5e;
        color: #eeeef5;
        font-size: 1rem;
        padding: 5px 10px;
        border-radius: 5px;
    }
</style>
