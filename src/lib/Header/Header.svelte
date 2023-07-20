<script lang="ts">

</script>

<div>
    <slot></slot>
</div>

<style lang="scss">
    div {
        background-color: $secondary-colour;
        width:100%;
    }

    div :global(a) {
        text-decoration: none;
        color: $tertiary-colour;
        font-family: $main-font;
        padding: 0 1rem;
    }

    div :global(a:hover) {
        background-color: $select-colour;
    }

</style>
