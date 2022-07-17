<script>
    import Setting from "../Setting.svelte";
    import { settingsStore } from "../../../store/settings.js";
</script>

<Setting>
    <h2>Отображение информации о ролях:</h2>
    <div class="roleDetailsSetting">
        <span class:disabled={!$settingsStore.viewIconsCards}>
            Показывать картинки во время выдачи ролей
        </span>
        <div>
            <input
                id="switchBtn2"
                class="switchBtn"
                type="checkbox"
                checked={$settingsStore.viewIconsCards}
                on:input={settingsStore.onChangeViewIconsFlag}
            />
            <label for="switchBtn2" class="switchBtnLabel">Toggle</label>
        </div>
    </div>
    <div class="roleDetailsSetting">
        <span class:disabled={!$settingsStore.viewDescriptionCards}>
            Показывать описания к ролям во время выдачи
        </span>
        <div>
            <input
                id="switchBtn3"
                class="switchBtn"
                type="checkbox"
                checked={$settingsStore.viewDescriptionCards}
                on:input={settingsStore.onChangeViewDescriptionsFlag}
            />
            <label for="switchBtn3" class="switchBtnLabel">Toggle</label>
        </div>
    </div>
</Setting>

<style>
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
