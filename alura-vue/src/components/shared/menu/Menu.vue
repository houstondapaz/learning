<template>
    <nav>
        <ul>
            <li v-for="route in rotas">
                <router-link :to="{ name: route.name }">{{ route.titulo }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        rotas: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>

