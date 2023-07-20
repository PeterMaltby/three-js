<!--
DropDownOption.svelte
author: peterm
created: 2023-07-16
 ___   ___   ___   ___  ___    ___ __      __ _  _   ___   ___  _____  ___ 
|   \ | _ \ / _ \ | _ \|   \  / _ \\ \    / /| \| | / _ \ | _ \|_   _||_ _|
| |) ||   /| (_) ||  _/| |) || (_) |\ \/\/ / | .` || (_) ||  _/  | |   | | 
|___/ |_|_\ \___/ |_|  |___/  \___/  \_/\_/  |_|\_| \___/ |_|    |_|  |___|
                                                                           
  ___   _  _ 
 / _ \ | \| |
| (_) || .` |
 \___/ |_|\_|
             
-->
<script lang="typescript" >
    export let disabled: Boolean= false;

</script>

<div class:disabled={disabled} >
    <slot></slot>
    {#if disabled}
        <p> disabled working </p>
    {/if}
</div>

<style lang="scss">
    .disabled {
        background-color: green;
    }

</style>

