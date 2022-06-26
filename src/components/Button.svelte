<script>
    export let clickEvent,
        style,
        color = "primary",
        type = "button";

    import { colors } from "../constants/colors";
</script>

<button
    on:click={clickEvent}
    {type}
    style="{style !== undefined ? style : ''} background-color:{colors[color]};"
    ><slot /></button
>

<style>
    button {
        max-width: 80%;
        font-size: 1.3rem;
        cursor: pointer;
        outline: none;
        border: none;
        border-radius: 10px;
        padding: 15px 40px;
        color: white;
    }
    @media screen and (max-width: 440px) {
        button {
            max-width: 100%;
            width: 90%;
            font-size: 1rem;
        }
    }
</style>
