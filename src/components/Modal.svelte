<script>
</script>

<div class="modal">
    <slot />
</div>

<style>
    .modal {
        position: fixed;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        z-index: 999;
    }
</style>
