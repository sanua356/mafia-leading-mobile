<script>
    export let labelName = "",
        checked = false,
        onChange = () => {},
        style = "";
</script>

<div {style} class="switchBtnArea">
    <input
        id={labelName}
        class="switchBtn"
        type="checkbox"
        {checked}
        on:input={onChange}
    />
    <label for={labelName} class="switchBtnLabel">Toggle</label>
</div>

<style>
    .switchBtnArea {
        display: flex;
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
</style>
