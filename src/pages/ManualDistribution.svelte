<script>
    import { navigateTo } from "svelte-router-spa";
    import Button from "../components/Button.svelte";
    import Container from "../components/Container.svelte";
    import Layout from "../components/Layout.svelte";
    import Table from "../components/Table.svelte";
    import { allCardsList, updateAllCardsList } from "../constants/cards.js";
    import { manualStore } from "../store/manualdistrib.js";
    import { selectedCardsStore } from "../store/selectedCards.js";
    import { onMount } from "svelte";
    import TextInputModal from "../components/modals/TextInputModal.svelte";

    //Пропсы для кнопки подтверждения окончания выбора карт (по умолчанию перекидывает на страницу превью, но также используется для создания пресетов)
    export let confirmBtnText = "Подтвердить",
        confirmBtnEvent = onDistributionComplieted;

    onMount(() => {
        manualStore.clearCustomRoleField();
    });

    //Функция подтверждения завершения выбора карт для раздачи
    function onDistributionComplieted() {
        const cardsList = Object.values($selectedCardsStore.cards);
        for (let i = 0; i < cardsList.length; i++) {
            if (cardsList[i] !== 0) {
                navigateTo("preview-distribution");
                break;
            }
        }
    }

    //Параметры модалки добавления кастом роли
    let modalParams = {
        showFlag: false,
        labelName: "Название новой роли",
        inputValue: $manualStore.newRoleName,
        changeInputEvent: manualStore.onChangeNameCustomRole,
        confirmBtnText: "Сохранить",
        confirmBtnEvent: onCreateCustomRole,
        backBtnEvent: () => {
            modalParams.showFlag = false;
        },
        errorFlag: false,
        errorText: "Недопустимое название роли. Введите корректное название.",
    };

    function onCreateCustomRole() {
        modalParams.errorFlag = false;
        if ($manualStore.newRoleName.length > 0) {
            if (!manualStore.createCustomRole()) {
                modalParams.errorFlag = true;
            } else {
                modalParams.showFlag = false;
                manualStore.clearCustomRoleField();
                updateAllCardsList(); //Переинициализировать весь список карт (вызов функции из файла constants/cards.js)
                selectedCardsStore.reinit();
            }
        } else {
            modalParams.errorFlag = true;
        }
    }
</script>

<Layout>
    <Container>
        <div>
            <h1>Выберите карты</h1>
            <hr />
        </div>
        <div class="roles">
            <Table>
                <thead>
                    <th align="left">Название карты</th>
                    <th align="right">Количество</th>
                </thead>
                {#each Object.entries(allCardsList) as [cardName, role]}
                    <tr>
                        <td>{role.name}</td>
                        <td align="right" class="cardCounterColumn">
                            <button
                                class="changeCardCountBtn 
                                {$selectedCardsStore.cards[cardName] >= 100
                                    ? 'disabledBtn'
                                    : ''}"
                                on:click={() =>
                                    selectedCardsStore.incrementCardCount(
                                        cardName
                                    )}>+</button
                            >
                            <input
                                type="number"
                                min="0"
                                max="100"
                                name={cardName}
                                value={$selectedCardsStore.cards[cardName]}
                                class="cardCountInput 
                                {$selectedCardsStore.cards[cardName] !== 0
                                    ? 'activeCard'
                                    : ''}"
                                on:input={(e) =>
                                    selectedCardsStore.onCardCountChanged(
                                        cardName,
                                        e
                                    )}
                            />
                            <button
                                class="changeCardCountBtn 
                                {$selectedCardsStore.cards[cardName] <= 0
                                    ? 'disabledBtn'
                                    : ''}"
                                on:click={() =>
                                    selectedCardsStore.decrementCardCount(
                                        cardName
                                    )}>-</button
                            >
                        </td>
                    </tr>
                {/each}
            </Table>
        </div>
        <span
            class="addCustomRole"
            class:active={modalParams.showFlag}
            on:click={() => (modalParams.showFlag = true)}
        >
            Добавить свою роль
        </span>
        <h2 class="cardCounterIndicator">
            Количество игроков: {Object.values(
                $selectedCardsStore.cards
            ).reduce((sum, a) => sum + a, 0)}
        </h2>
        <div class="buttons">
            <Button clickEvent={confirmBtnEvent}>{confirmBtnText}</Button>
            <Button color="secondary" clickEvent={() => navigateTo("/home")}
                >Назад</Button
            >
        </div>
    </Container>
</Layout>

<TextInputModal {...modalParams} />

<style>
    .roles {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
    }
    .buttons {
        width: 90%;
    }
    .disabledBtn {
        pointer-events: none;
        opacity: 0.6 !important;
    }
    .cardCountInput {
        width: 3rem;
        color: #6f6f6f;
        background-color: transparent;
        border: none;
        font-size: 1.5rem;
        text-align: center;
        transition: 0.3s ease-in-out all;
    }
    .cardCountInput.activeCard {
        color: #eeeef5;
    }
    .changeCardCountBtn {
        cursor: pointer;
        font-size: 1.5rem;
        color: #eeeef5;
        background-color: #3f3d5e;
        border: none;
        padding: 3px 15px;
        border-radius: 8px;
    }
    .cardCounterColumn {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .cardCounterIndicator {
        margin: 20px 0;
        text-align: center;
    }
    .addCustomRole {
        font-size: 1.3rem;
        display: block;
        width: 100%;
        text-align: center;
        padding: 20px 0;
        margin: 20px 0;
        border: 2px dashed gray;
        opacity: 0.6;
        transition: 0.3s ease-in-out all;
    }
    .addCustomRole.active {
        opacity: 1;
    }
</style>
