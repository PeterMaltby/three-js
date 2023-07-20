<!--
DropDownMenu.svelte
author: peterm
created: 2023-07-16
 ___   ___   ___   ___  ___    ___ __      __ _  _  __  __  ___  _  _  _   _ 
|   \ | _ \ / _ \ | _ \|   \  / _ \\ \    / /| \| ||  \/  || __|| \| || | | |
| |) ||   /| (_) ||  _/| |) || (_) |\ \/\/ / | .` || |\/| || _| | .` || |_| |
|___/ |_|_\ \___/ |_|  |___/  \___/  \_/\_/  |_|\_||_|  |_||___||_|\_| \___/ 
                                                                             
-->
<script lang="typescript" >

    export let label:String = "DropDownMenu";

    let container: any;
    let show = false;

    function onWindowClick(e: Event) {
        if (container.contains(e.target) == false)
            show = false;
    }

</script>

<svelte:window on:click={onWindowClick} />

<div >
    <button 
        bind:this={container} 
        on:click={() => show = true} >
        {label}
    </button>

    <div class="dropDownContent" class:show={show} >
        <slot></slot>
    </div>
</div>

<style lang="scss">
    button {
        background-color: $secondary-colour;
        border-right: 1px solid $tertiary-colour;
        border-left: 1px solid $tertiary-colour;
        font-family: $main-font;
    }
    
    .dropDownContent {
        position: absolute;
        background-color: #f1f1f1;
        min-width: 15em;
        z-index: 1;
        display: none;
    }

    .show {
        display: block;
    }
</style>

