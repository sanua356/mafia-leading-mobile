<div class="pageContainer">
    <slot />
</div>

<style>
    .pageContainer {
        width: 100%;
        min-height: 100vh;
        overflow-y: auto;
        padding: 5%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }
    @media screen and (min-width: 768px) {
        .pageContainer {
            justify-content: center;
            align-items: center;
            width: 70%;
        }
    }
    :global(.pageContainer h1, h2) {
        font-size: 1.5rem;
    }
    :global(.pageContainer span) {
        display: block;
        margin-bottom: 10px;
        font-size: 1.1rem;
    }
    @media screen and (min-width: 441px) {
        :global(.pageContainer .buttons) {
            justify-content: center;
        }
    }
</style>
