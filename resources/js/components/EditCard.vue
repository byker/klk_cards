<template>
    <v-container>
        <v-row class="mb-4">
            <v-col>
                <h1 class="text-h4">Edytuj kartotekę</h1>
            </v-col>
        </v-row>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="$store.state.cardSelected.name" :counter="100"
                :rules="$store.state.cardRules.nameRule" label="Nazwa kartoteki" required></v-text-field>

        </v-form>
        <v-row>
            <v-col>
                <h2 class="h5">Produkty przypisane do karty:</h2>
            </v-col>
        </v-row>
        <v-row class="mt-5">
            <v-col v-for="product in $store.state.cardSelected.products" :key="product.id" cols="12" sm="6" md="4">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ product.name }}</span>
                    </v-card-title>
                    <v-card-text>
                        {{ product.description }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="primary">Edytuj</v-btn>
                        <v-btn text color="primary">Usuń</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title>
                        <span class="headline">Dodaj produkt do karty:</span>
                    </v-card-title>
                    <v-card-text>
                        <v-select v-model="$store.state.productSelected" :items="$store.state.products" item-text="name"
                            item-value="id" label="Produkt" required></v-select>
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
export default {
    data() {
        return {

            valid: true
        }
    },
    created() {
        this.$store.dispatch('fetchSingleCard', this.$route.params.id);
        this.$store.dispatch('fetchProductsData', this.$route.params.id);
    }
}
</script>