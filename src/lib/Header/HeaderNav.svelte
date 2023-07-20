<!--
HeaderNav.svelte
author: peterm
created: 2023-07-15
 _  _  ___    _    ___   ___  ___  _  _    _ __   __
| || || __|  /_\  |   \ | __|| _ \| \| |  /_\\ \ / /
| __ || _|  / _ \ | |) || _| |   /| .` | / _ \\ V / 
|_||_||___|/_/ \_\|___/ |___||_|_\|_|\_|/_/ \_\\_/  
                                                    
-->
<script lang="typescript" >

</script>

<nav>
    <slot></slot>
</nav>

<style lang="scss">
    nav :global(a) {
        font-size: 1.5em;
        text-decoration: none;
        color: $secondary-colour;
        font-family: $main-font;
        display: inline-block;
        height: 2rem;
        width: 6rem;
        text-align: center;

    }

    nav :global(a:hover) {
        background-color: $select-colour;
    }

    nav {
        background-color: $primary-colour;
        height: 2rem;
    }
</style>

