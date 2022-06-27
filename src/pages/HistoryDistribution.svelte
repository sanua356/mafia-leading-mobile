<script>
    import Container from "../components/Container.svelte";

    import Layout from "../components/Layout.svelte";

    const history = JSON.parse(localStorage.getItem("history")) || {};
</script>

<Layout>
    <Container>
        <h1>История игр</h1>
        <hr />
    </Container>
</Layout>
