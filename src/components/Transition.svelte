<script>
    import { afterUpdate, tick } from "svelte";
    export let showFlag = false,
        mountClass = "mountingStage",
        unmountClass = "unmountingStage",
        unmountDuration = 10000;

    let viewFlag = false,
        animationNode;

    afterUpdate(async () => {
        if (showFlag === true) {
            viewFlag = true;
            await tick();
            if (animationNode.children.length > 0) {
                setTimeout(() => {
                    animationNode.firstChild.classList.add(mountClass);
                }, 1);
            }
        }

        if (animationNode.children.length > 0 && !showFlag) {
            animationNode.firstChild.classList.add(unmountClass);
            window.setTimeout(() => {
                viewFlag = false;
                animationNode?.firstChild?.classList?.remove(unmountClass);
                animationNode?.firstChild?.classList?.remove(mountClass);
            }, unmountDuration);
        }
    });
</script>

<div class="animationContainer" bind:this={animationNode}>
    {#if viewFlag}
        <slot />
    {/if}
</div>

<style>
    .animationContainer {
        display: contents;
    }
</style>
