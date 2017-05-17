<template>
    <nav>
        <ul>
            <li v-for="route in rotas">
                <router-link :to="route.path ? route.path : '/'">{{ route.titulo }}</router-link>
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

