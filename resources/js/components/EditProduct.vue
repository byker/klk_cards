<template>
    <v-container>
        <pageTitle ></pageTitle>

        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="$store.state.productSelected.name" :counter="50"
                :rules="$store.state.productRules.nameRule" label="Nazwa produktu" required></v-text-field>
            <v-textarea name="description" filled label="Opis" auto-grow
                v-model="$store.state.productSelected.description"></v-textarea>
            <v-text-field v-model="$store.state.productSelected.price" :rules="$store.state.productRules.priceRule" label="Cena" ></v-text-field>
        </v-form>
        <v-row>
            <v-col>
                <v-btn @click="$store.dispatch('saveProduct', $store.state.productSelected)"
                    color="primary">Zapisz</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import pageTitle from './partial/Title.vue';
export default {

    components: {
        pageTitle
    },
    data() {
        return {

            valid: true
        }
    },
    created() {
        this.$store.dispatch('fetchSingleProduct', this.$route.params.id);
        this.$store.commit('setPageTitle', 'Edytuj produkt');

        if (this.$store.getters.currentUserCan('editProduct') == false) {
            this.$router.push('/');
        }

    },


}
</script>