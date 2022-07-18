<script>
    export let style,
        value,
        onChange,
        id,
        type = "text",
        placeholder = "",
        rows = 3;
</script>

<textarea
    {type}
    {placeholder}
    {value}
    {rows}
    {id}
    {style}
    on:input={onChange}
/>

<style>
    textarea {
        width: 100%;
        font-size: 1.2rem;
        padding: 7px 15px;
        border-radius: 5px;
        color: rgba(255, 255, 255, 0.8);
        background-color: #151429;
        border: none;
        transition: 0.2s ease-in-out all;
    }
    textarea:focus {
        color: white;
    }
    @media screen and (max-width: 440px) {
        textarea {
            width: 90%;
            font-size: 1.1rem;
        }
    }
</style>
