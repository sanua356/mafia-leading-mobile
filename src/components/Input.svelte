<script>
    export let style,
        value,
        onChange,
        id,
        type = "text",
        placeholder = "",
        min = 1,
        max = 100;
</script>

<input
    {type}
    {placeholder}
    {value}
    {min}
    {max}
    {id}
    {style}
    on:input={onChange}
/>

<style>
    input {
        width: 100%;
        font-size: 1.5rem;
        padding: 7px 15px;
        border-radius: 5px;
        color: rgba(255, 255, 255, 0.8);
        background-color: #151429;
        border: none;
        transition: 0.2s ease-in-out all;
    }
    input:focus {
        color: white;
    }
    @media screen and (max-width: 440px) {
        input {
            width: 90%;
            font-size: 1.3rem;
        }
    }
</style>
