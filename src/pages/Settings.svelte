<script>
    import Button from "../components/Button.svelte";

    import Container from "../components/Container.svelte";
    import Layout from "../components/Layout.svelte";
    import { swipeMenuStore } from "../store/swipemenu.js";
</script>

<Layout>
    <Container>
        <h1>Настройки</h1>
        <hr />
        <div class="settingsArea" style="flex: 1 1 auto;">
            <div class="setting deathZoneSetting">
                <label for="deathZoneSwipesInput">
                    Мертвая зона свайпов:
                </label>
                <div class="deathZoneSettinSelectedValue">
                    <input
                        id="deathZoneSwipesInput"
                        type="range"
                        max="90"
                        min="5"
                        value={$swipeMenuStore.deathZoneSwipe}
                        on:input={(e) =>
                            swipeMenuStore.onChangeDeathZoneSwipe(
                                e.target.value
                            )}
                    />
                    <span>{$swipeMenuStore.deathZoneSwipe}</span>
                </div>
            </div>
        </div>
        <div class="buttons">
            <Button>Сохранить настройки</Button>
        </div>
    </Container>
</Layout>

<style>
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
    .deathZoneSetting label {
        margin-bottom: 15px;
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
        background: #ff002f;
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
