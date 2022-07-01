<script>
    import Button from "../components/Button.svelte";
    import Container from "../components/Container.svelte";
    import Layout from "../components/Layout.svelte";
    import { swipeMenuStore } from "../store/swipemenu.js";
    import { settingsStore } from "../store/settings.js";
</script>

<Layout>
    <Container>
        <h1>Настройки</h1>
        <hr />
        <div class="settingsArea">
            <div class="setting deathZoneSetting">
                <h2>Мертвая зона свайпов:</h2>
                <div class="deathZoneSettinSelectedValue">
                    <input
                        id="deathZoneSwipesInput"
                        type="range"
                        max="90"
                        min="5"
                        value={$swipeMenuStore.deathZoneSwipe}
                        on:input={(e) =>
                            swipeMenuStore.onChangeDeathZoneSwipe(e)}
                    />
                    <span>{$swipeMenuStore.deathZoneSwipe}</span>
                </div>
                <p>
                    "Мертвая зона" указывает на то, насколько далеко вы должны
                    проводить пальцем по экрану, чтобы вызвать\скрыть меню
                    (значение указывается в процентах от ширины вашего экрана)
                </p>
                <hr class="settingSeparator" />
            </div>
            <div class="setting">
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
                        <label for="switchBtn" class="switchBtnLabel"
                            >Toggle</label
                        >
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
                        Таймер показывает, через сколько секунд карта, которую
                        игрок увидел, скроется
                    </p>
                {/if}
                <hr class="settingSeparator" />
            </div>
        </div>
    </Container>
</Layout>

<style>
    .disabled {
        opacity: 0.6;
    }
    .settingsArea {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .setting {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .setting p {
        font-size: 0.9rem;
        opacity: 0.6;
        margin-top: 10px;
    }
    .setting h2 {
        margin-bottom: 10px;
        font-size: 1.2rem;
    }
    .settingSeparator {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 40px;
        height: 2px;
        opacity: 0.6;
    }
    #deathZoneSwipesInput {
        width: 100%;
        height: 3vh;
        -webkit-appearance: none;
        background: #3f3d5e;
        outline: none;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 1);
    }

    #deathZoneSwipesInput::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 4vh;
        height: 4vh;
        border-radius: 50%;
        background: #eeeef5;
        cursor: pointer;
        border: 3px solid #3f3d5e;
        box-shadow: -407px 0 0 400px #ff002f;
    }
    .deathZoneSettinSelectedValue {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .deathZoneSettinSelectedValue span {
        margin-left: 20px;
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
