<template>
    <v-row class="mb-4">
        <v-col>
            <h1 class="text-h4 text-primary">{{ pageTitle }}</h1>
        </v-col>
    </v-row>
</template>

<script>
export default {
    computed: {
        pageTitle() {
            return this.$store.state.pageTitle;
        }
    }
}
</script>