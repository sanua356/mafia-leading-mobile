<script>
    export let customStyle = null,
        clickEvent = () => {};
</script>

<div
    class="modalContainer"
    style={customStyle !== null ? customStyle : ""}
    on:click={clickEvent}
>
    <slot />
</div>

<style>
    .modalContainer {
        color: #eeeef5;
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        background-color: #27263b;
        border-radius: 10px;
    }

    @media screen and (min-width: 481px) and (max-width: 768px) {
        .modalContainer {
            width: 60%;
        }
    }
    @media screen and (min-width: 769px) and (max-width: 1440px) {
        .modalContainer {
            width: 50%;
        }
    }
    :global(.modalContainer h3) {
        font-size: 1.3rem;
    }
    :global(.modalArea) {
        width: 100%;
    }
    :global(.modalArea label) {
        display: block;
        font-size: 1.3rem;
        margin-bottom: 10px;
    }
    :global(.modalError) {
        display: none;
        margin-top: 15px;
        color: rgb(201 19 19);
        font-size: 1.2rem;
    }
    :global(.modalShow) {
        display: block !important;
        text-align: center;
    }
</style>
