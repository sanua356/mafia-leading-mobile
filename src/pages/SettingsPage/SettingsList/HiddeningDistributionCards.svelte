<script>
    import Setting from "../Setting.svelte";
    import { settingsStore } from "../../../store/settings.js";
</script>

<Setting>
    <h2>Скрытие карт во время выдачи:</h2>
    <div class="switchBtnArea">
        <span class:disabled={$settingsStore.hiddeningCardsFlag}>
            По клику на карту
        </span>
        <div>
            <input
                id="switchBtn"
                class="switchBtn"
                type="checkbox"
                max="90"
                min="5"
                checked={$settingsStore.hiddeningCardsFlag}
                on:input={settingsStore.onChangeFlagHiddeningCards}
            />
            <label for="switchBtn" class="switchBtnLabel">Toggle</label>
        </div>
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
    .switchBtn {
        height: 0;
        width: 0;
        visibility: hidden;
    }

    .switchBtnLabel {
        cursor: pointer;
        text-indent: -9999px;
        width: 10vh;
        height: 4vh;
        background: #3f3d5e;
        display: block;
        border-radius: 30px;
        position: relative;
        box-shadow: inset 0 0 5px rgb(0 0 0);
    }

    .switchBtnLabel:after {
        content: "";
        position: absolute;
        top: 4px;
        left: 5px;
        width: 3vh;
        height: 3vh;
        background: #fff;
        border-radius: 30px;
        transition: 0.3s;
    }

    .switchBtn:checked + label {
        background: #ff002f;
    }

    .switchBtn:checked + label:after {
        left: calc(100% - 5px);
        transform: translateX(-100%);
    }

    .switchBtn:active:after {
        width: 130px;
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
