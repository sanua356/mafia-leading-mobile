<script>
    import Button from "../../../components/Button.svelte";
    import Layout from "../../../components/Layout.svelte";
    import { settingsStore } from "../../../store/settings.js";
    export let changePageEvent = () => {};

    let testAnimationFlag = false;
</script>

<Layout>
    <div class="container">
        <h2>Включите или отключите анимации</h2>
        <span style="margin-top: 35px;">
            Если вы запускаете приложение на <strong>слабом устройстве</strong>,
            вы можете отключить большинство анимаций, тогда приложение сможет
            работать быстрее.
        </span>
        <span>
            Кликните на кнопку <strong>"Тест анимации"</strong> и смотрите на
            красно-черные квадраты.
            <br />
            Если вы замечаете поддергивания анимации, отключите их переключателем
            снизу.
        </span>

        <div class="animationsArea" style="flex: 1 1 auto;">
            <div
                class="cubeAnimation"
                class:animate={testAnimationFlag}
                class:disableTransition={$settingsStore.disableAnimationsFlag}
            />
            <div
                class="cubeAnimation cube-2"
                class:animate={testAnimationFlag}
                class:disableTransition={$settingsStore.disableAnimationsFlag}
            />
            <div
                class="cubeAnimation cube-3"
                class:animate={testAnimationFlag}
                class:disableTransition={$settingsStore.disableAnimationsFlag}
            />
            <div
                class="cubeAnimation cube-4"
                class:animate={testAnimationFlag}
                class:disableTransition={$settingsStore.disableAnimationsFlag}
            />
        </div>
        <div class="disableAnimationsBtn">
            <div>
                <span> Отключить отображение анимаций и переходов </span>
                <p class="animationStatus">
                    Сейчас анимации:
                    {$settingsStore.disableAnimationsFlag
                        ? "ВЫКЛЮЧЕНЫ"
                        : "ВКЛЮЧЕНЫ"}
                </p>
            </div>
            <aside>
                <input
                    id="switchBtn2"
                    class="switchBtn"
                    type="checkbox"
                    checked={$settingsStore.disableAnimationsFlag}
                    on:input={settingsStore.onChangeDisableAnimationsFlag}
                />
                <label for="switchBtn2" class="switchBtnLabel">Toggle</label>
            </aside>
        </div>

        <div class="buttons">
            <Button
                color="secondary"
                style={"width: 100%; margin-bottom: 15px;"}
                clickEvent={() => {
                    testAnimationFlag = !testAnimationFlag;
                }}>Тест анимации</Button
            >
            <Button
                style={"width: 100%;  margin-bottom: 15px;"}
                clickEvent={() => changePageEvent(3)}>Далее</Button
            >
            <Button
                color="secondary"
                style={"width: 100%;"}
                clickEvent={() => changePageEvent(1)}>Назад</Button
            >
        </div>
    </div>
</Layout>

<style>
    .container {
        width: 100%;
        min-height: 100vh;
        overflow-y: auto;
        padding: 5%;
        margin: 0 auto;
    }
    @media screen and (min-width: 768px) {
        .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 70%;
        }
    }
    .container h2 {
        font-size: 1.5rem;
    }
    .container span {
        margin-bottom: 10px;
        font-size: 1.1rem;
    }
    .animationsArea {
        margin-top: 35px;
        width: 100%;
    }
    .cubeAnimation {
        width: 40px;
        height: 40px;
        margin-bottom: 20px;
        background: url("../assets/cardbg.jpg");
        transition: 1s ease-in-out all;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .cube-2 {
        transition-delay: 0.3s;
    }
    .cube-3 {
        transition-delay: 0.6s;
    }
    .cube-4 {
        transition-delay: 0.9s;
    }
    .animate {
        transform: translateX(70vw);
    }
    .disableTransition {
        transition: none !important;
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
    .disableAnimationsBtn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
        margin-top: 20px;
    }
    .disableAnimationsBtn > aside {
        margin-top: -30px;
    }
    .disableAnimationsBtn span {
        margin-right: 10px;
    }
    .animationStatus {
        margin-top: 5px;
        opacity: 0.7;
    }
    @media screen and (min-width: 441px) {
        .buttons {
            justify-content: center;
        }
    }
    @media screen and (min-width: 768px) {
        .buttons {
            justify-content: center;
        }
        .animate {
            transform: translateX(50vw);
        }
    }
</style>
