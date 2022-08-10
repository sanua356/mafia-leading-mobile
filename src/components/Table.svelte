<script>
    export let style = "";
</script>

<table class="table" {style}><slot /></table>

<style>
    :global(.table) {
        width: 100%;
    }
    :global(.table th) {
        font-size: 22px;
    }
    :global(.table td) {
        font-size: 20px;
        padding: 15px 0;
        word-break: break-word;
    }
</style>
