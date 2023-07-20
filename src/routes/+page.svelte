<script>
    import HeaderSection from "$lib/Header/HeaderSection.svelte";
    import Header from "$lib/Header/Header.svelte"
    import HeaderNav from "$lib/Header/HeaderNav.svelte";
    import HeaderItem from "$lib/Header/HeaderItem.svelte";
    import DropDownMenu from "$lib/DropDown/DropDownMenu.svelte";
    import DropDownOption from "$lib/DropDown/DropDownOption.svelte"
    import Container from "$lib/Containers/Container.svelte";
    import Renderer from "$lib/Render/Renderer.svelte";
</script>

<Header>
    <HeaderSection>
        <HeaderItem>
            <DropDownMenu label="settings" >
                <DropDownOption>option 1</DropDownOption>
                <DropDownOption>option 2</DropDownOption>
                <DropDownOption disabled>disabled</DropDownOption>
                <divider />
                <DropDownOption>option 4</DropDownOption>
            </DropDownMenu>
        </HeaderItem>
        <HeaderItem right><a href="https://www.petermaltby.com">exit</a></HeaderItem>
    </HeaderSection>

    <HeaderSection>
        <Container>
            <h1>Game</h1>
        </Container>
    </HeaderSection>

    <HeaderNav>
        <Container>
        <a class="" href="/">home</a>
        <a class="" href="/about">about</a>
        <a class="" href="/dev">dev</a>
        </Container>
    </HeaderNav>
</Header>

<Renderer />

<style lang="scss">

:global(*) { border: 0px solid red; }

:global(body) { margin: 0; }

:global(h1) {
    font-family: $title-font;
}

</style>
