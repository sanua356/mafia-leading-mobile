<script>
    import Button from "../../../components/Button.svelte";
    import Layout from "../../../components/Layout.svelte";
    import PageContainer from "../PageContainer.svelte";

    export let changePageEvent = () => {};
</script>

<PageContainer>
    <h1>
        Приветствуем вас в приложении для ведущего карточной игры -
        <strong style="color: #FF002F;"> "Мафия" </strong>
    </h1>
    <span>В данном приложении вы имеете возможность:</span>
    <nav>
        <ul>
            <li>✅ Раздавать роли игрокам.</li>
            <li>✅ Смотреть историю 100 последних раздач.</li>
            <li>✅ Создавать свои роли.</li>
            <li>✅ Создавать наборы (пресеты) для быстрой раздачи ролей.</li>
            <li>✅ Хранить информацию об игре в заметках.</li>
            <li>
                ✅ Поддерживается управление свайпами (для вызова меню быстрого
                выбора).
            </li>
        </ul>
    </nav>
    <aside>
        ⚠️Внимание⚠️ <br />Приложение предназначено для ведущего. Внутри него
        нельзя играть, но оно помогает в раздаче ролей игрокам.
    </aside>
    <div class="buttons" style="flex: 1 1 auto; width: 100%;">
        <Button style={"width: 100%;"} clickEvent={() => changePageEvent(2)}
            >Далее</Button
        >
    </div>
</PageContainer>

<style>
    span {
        margin-top: 35px;
        margin-bottom: 15px;
    }
    li {
        list-style-type: none;
        font-size: 1.1rem;
        margin: 10px 0;
    }
    aside {
        text-align: center;
        margin-top: 20px;
        font-size: 1.1rem;
        opacity: 0.7;
    }
</style>
