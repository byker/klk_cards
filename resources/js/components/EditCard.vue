<template>
    <v-container>
        <pageTitle></pageTitle>

        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="$store.state.cardSelected.name" :counter="100"
                :rules="$store.state.cardRules.nameRule" label="Nazwa kartoteki" required></v-text-field>

        </v-form>
        <v-row>
            <v-col>
                <p class="h5 mt-5 font-weight-bold">Produkty przypisane do kartoteki:</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col  v-for="product in $store.state.cardSelected.products" :key="product.id" cols="12" sm="6" md="6">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ product.name }}</span>
                    </v-card-title>
                    <v-card-text>
                        {{ product.description }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text @click="$store.dispatch('editProduct', product.id)" color="primary">Edytuj</v-btn>
                        <v-btn v-if="$store.getters.checkDeleteCardPossible == true" @click="$store.dispatch('removeProductFromSelectedCard', product.id)" text
                            color="primary">Usuń</v-btn>
                            <v-btn v-else text small color="secondary">Aby usunąć dektywuj kartę</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-card class="blue lighten-2" v-if="$store.getters.checkAddProductToCardPossible == true">
                    <v-card-title>
                        <span class="headline">Dodaj produkt do karty:</span>
                    </v-card-title>
                    <v-card-text class="">
                        Pozostało produktów do przypisania: {{ 5 - [...($store.state.cardSelected?.products ||
                        [])].length }} (Max. 5 )

                        <v-select v-if="[...($store.state.cardSelected?.products || [])].length < 5"
                            @change="$store.dispatch('addProductToSelectedCard')" v-model="$store.state.productSelected"
                            :items="$store.state.products" item-text="name" item-value="id" label="Produkt"
                            required></v-select>
                    </v-card-text>
                </v-card>
                <v-card class="red lighten-2" v-else>
                    <v-card-title>
                        <span class="headline">Nie można dodać produktu do karty:</span>
                    </v-card-title>
                    <v-card-text class="">
                        aktywuj kartę.
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn @click="$store.dispatch('saveCard', $store.state.cardSelected)" color="primary">Zapisz</v-btn>
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
        this.$store.dispatch('fetchSingleCard', this.$route.params.id);
        this.$store.dispatch('fetchProductsNotAssignedToCard', this.$route.params.id);
        this.$store.commit('setPageTitle', 'Edytuj kartotekę');
        if (this.$store.getters.currentUserCan('editCard') == false) {
            this.$router.push('/');
        }
    }

}
</script>