<!--
Renderer.svelte
author: peterm
created: 2023-07-16
 ___  ___  _  _  ___   ___  ___  ___  ___ 
| _ \| __|| \| ||   \ | __|| _ \| __|| _ \
|   /| _| | .` || |) || _| |   /| _| |   /
|_|_\|___||_|\_||___/ |___||_|_\|___||_|_\
                                          
-->
<script lang="typescript" >
    import { onMount } from "svelte";
    import { renderer } from "./renderer"

    onMount(() => {
        renderer("fullscreenCanvas");
    });

</script>

<canvas id="fullscreenCanvas"></canvas>

<style lang="scss">

    #fullscreenCanvas {
        border: 2px solid red;
        width: 100%;
        height: 100%;
        margin: 0;
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;
    }

</style>


