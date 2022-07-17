<div class="setting">
    <slot />
    <hr class="settingSeparator" />
</div>

<style>
    .setting {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    :global(.setting p) {
        font-size: 0.9rem;
        opacity: 0.6;
    }
    :global(.setting h2) {
        margin-bottom: 10px;
        font-size: 1.2rem;
    }
    .settingSeparator {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 40px;
        height: 2px;
        opacity: 0.6;
    }
</style>
