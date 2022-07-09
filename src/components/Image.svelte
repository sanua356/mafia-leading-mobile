<script>
    import { afterUpdate } from "svelte";

    export let imgSrc, boundaryImgSrc, alt;

    let badBoundaryImg = false;
    let imgNode;

    function imgBoundaryEvent(e) {
        if (!badBoundaryImg) {
            e.target.src = boundaryImgSrc;
        } else {
            e.target.classList.add("badImage");
        }
        badBoundaryImg = true;
    }
    afterUpdate(() => {
        badBoundaryImg = false;
        imgNode.classList.remove("badImage");
    });
</script>

<img src={imgSrc} {alt} on:error={imgBoundaryEvent} bind:this={imgNode} />

<style>
    :global(.badImage) {
        display: none;
    }
</style>
