<!--
Container.svelte
author: peterm
created: 2023-07-16
  ___  ___   _  _  _____  _    ___  _  _  ___  ___ 
 / __|/ _ \ | \| ||_   _|/_\  |_ _|| \| || __|| _ \
| (__| (_) || .` |  | | / _ \  | | | .` || _| |   /
 \___|\___/ |_|\_|  |_|/_/ \_\|___||_|\_||___||_|_\
                                                   
-->
<script lang="typescript" >
</script>

<div>
    <slot></slot>
</div>

<style lang="scss">
    div {
        width:80%;
        max-width: 140rem;
        margin: 0 auto;
    }

    @media only screen and (max-width: 860px) {
        div {
            width:100%;
        }
    }
</style>

