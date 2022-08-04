<script>
    import { afterUpdate, tick } from "svelte";
    import { settingsStore } from "../store/settings";
    export let showFlag = false,
        mountClass = "mountingStage",
        unmountClass = "unmountingStage",
        unmountDuration = 10000;

    let viewFlag = false,
        animationNode;

    afterUpdate(async () => {
        if (showFlag && !viewFlag) {
            viewFlag = true;
            await tick();
            if (animationNode.children.length > 0) {
                const timer = setTimeout(() => {
                    animationNode.firstChild.classList.add(mountClass);
                    if ($settingsStore.disableAnimationsFlag) {
                        animationNode.firstChild.style.transition = "none";
                    }
                    clearTimeout(timer);
                }, 1);
            }
        }

        if (animationNode.children.length > 0 && !showFlag) {
            animationNode.firstChild.classList.add(unmountClass);
            if ($settingsStore.disableAnimationsFlag) {
                animationNode.firstChild.style.transition = "none";
            }
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
