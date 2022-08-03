<script>
    import { onMount } from "svelte";
    import { navigateTo } from "svelte-router-spa";
    import TextInputModal from "../components/modals/TextInputModal.svelte";
    import { autoDistribStore } from "../store/autodistrib.js";
    import { selectedCardsStore } from "../store/selectedCards";
    import DistributionPreview from "./DistributionPreview.svelte";

    //Параметры модалки ввода количества игроков автораздатчика
    let modalParams = {
        showFlag: true,
        labelName: "Количество игроков",
        inputValue: $autoDistribStore.playersCount,
        changeInputEvent: autoDistribStore.onChangePlayersCount,
        confirmBtnText: "Сохранить",
        confirmBtnEvent: onSavePlayers,
        backBtnEvent: () => navigateTo("/home"),
        errorFlag: false,
        errorText: "Недопустимое число игроков. Введите корректное число.",
        inputType: "number",
    };

    onMount(() => {
        selectedCardsStore.reinit();
    });

    function onSavePlayers() {
        if (
            $autoDistribStore.playersCount.toString().length > 0 &&
            Number($autoDistribStore.playersCount) >= 1
        ) {
            modalParams.errorFlag = false;
            modalParams.showFlag = false;
            autoDistribStore.calculateDistribution();
        } else {
            modalParams.errorFlag = true;
        }
    }
</script>

<TextInputModal {...modalParams} />
<DistributionPreview />
