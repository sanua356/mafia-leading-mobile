<script>
    import Setting from "../Setting.svelte";
    import { settingsStore } from "../../../store/settings.js";
</script>

<Setting>
    <h2>Мертвая зона свайпов:</h2>
    <div class="deathZoneSettinSelectedValue">
        <input
            id="deathZoneSwipesInput"
            type="range"
            max="90"
            min="5"
            value={$settingsStore.deathZoneSwipe}
            on:input={(e) => settingsStore.onChangeDeathZoneSwipe(e)}
        />
        <span>{$settingsStore.deathZoneSwipe}</span>
    </div>
    <p class="mt-10">
        "Мертвая зона" указывает на то, насколько далеко вы должны проводить
        пальцем по экрану, чтобы вызвать\скрыть меню (значение указывается в
        процентах от ширины вашего экрана)
    </p>
</Setting>

<style>
    .mt-10 {
        margin-top: 10px;
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
</style>
