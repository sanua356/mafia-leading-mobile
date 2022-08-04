<script>
    import Setting from "../Setting.svelte";
    import { settingsStore } from "../../../store/settings.js";
</script>

<Setting>
    <h2>Отключение анимаций:</h2>
    <div class="roleDetailsSetting">
        <span class:disabled={!$settingsStore.viewIconsCards}>
            Отключить отображение анимаций и переходов
        </span>
        <div>
            <input
                id="switchBtn2"
                class="switchBtn"
                type="checkbox"
                checked={$settingsStore.disableAnimationsFlag}
                on:input={settingsStore.onChangeDisableAnimationsFlag}
            />
            <label for="switchBtn2" class="switchBtnLabel">Toggle</label>
        </div>
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

    .roleDetailsSetting {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
    }
    .roleDetailsSetting > div {
        display: flex;
    }
    .roleDetailsSetting > span {
        max-width: 80%;
    }
</style>
