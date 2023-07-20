<!--
HeaderItem.svelte
author: peterm
created: 2023-07-15
 _  _  ___    _    ___   ___  ___  ___  _____  ___  __  __ 
| || || __|  /_\  |   \ | __|| _ \|_ _||_   _|| __||  \/  |
| __ || _|  / _ \ | |) || _| |   / | |   | |  | _| | |\/| |
|_||_||___|/_/ \_\|___/ |___||_|_\|___|  |_|  |___||_|  |_|
                                                           
-->
<script lang="typescript" >
    export let right: Boolean = false;
</script>

<div class:right={right} >
    <slot></slot>
</div>

<style lang="scss">
    div {
        display: inline-block;
    }
    
    .right {
        float:right;
    }
</style>

