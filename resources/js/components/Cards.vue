<template>
    <v-container>
        <pageTitle ></pageTitle>
        <v-data-iterator :items="$store.state.cards" :items-per-page.sync="itemsPerPage" :page.sync="page"
            :search="search" :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" hide-default-footer>
            <template v-slot:header>
                <v-toolbar dark color="blue darken-3" class="mb-4">
                    <v-text-field v-model="search" clearable flat solo-inverted hide-details
                        prepend-inner-icon="mdi-magnify" label="Szukaj"></v-text-field>
                    <template v-if="$vuetify.breakpoint.mdAndUp">
                        <v-spacer></v-spacer>
                        <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys"
                            prepend-inner-icon="mdi-magnify" label="Sortuj wg"></v-select>
                        <v-spacer></v-spacer>
                        <v-btn-toggle v-model="sortDesc" mandatory>
                            <v-btn large depressed color="blue" :value="false">
                                <v-icon>mdi-arrow-up</v-icon>
                            </v-btn>
                            <v-btn large depressed color="blue" :value="true">
                                <v-icon>mdi-arrow-down</v-icon>
                            </v-btn>
                            <v-btn @click="$store.commit('setNewCard')" large depressed color="blue" :value="true">
                                <v-icon>mdi-plus</v-icon>
                                <span>
                                    Dodaj kartotekę
                                </span>
                            </v-btn>
                        </v-btn-toggle>
                    </template>
                </v-toolbar>
            </template>

            <template v-slot:default="props">
                <v-row>
                    <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="6" lg="4" class="d-flex ">
                        <v-card class="flex-grow-1 d-flex">
                            <v-container>

                                <v-card-title @click="$store.dispatch('editCard', item) "
                                    class="font-weight-bold text-primary text-darken-4 cursor-pointer p-0">
                                    {{ item.name }}
                                    <v-icon small class="ml-2">mdi-pencil</v-icon>
                                </v-card-title>

                                <v-divider></v-divider>

                                <v-row>
                                    <v-col cols="12">
                                        <span class="font-weight-bold">Przypisane produkty:</span>
                                    </v-col>
                                </v-row>
                                <v-row v-for="product in item.products" :key="product.id">
                                    <v-col cols="6">
                                        {{ product.name }}
                                    </v-col>
                                    <v-col cols="6" class="d-flex justify-content-end">
                                        <v-icon small>mdi-shopping-outline</v-icon>
                                        {{ product.price }}
                                    </v-col>

                                </v-row>
                                <v-divider></v-divider>

                                <v-btn
                                    @click="$store.commit('setCardEdit', { 'showEditCardPopup': true, 'cardToEdit': item })"
                                    elevation="2" outlined plain raised x-small>Edytuj</v-btn>
                                <v-btn @click="deleteCard(item)" elevation="2" outlined plain raised
                                    x-small>Usuń</v-btn>

                            </v-container>


                        </v-card>
                    </v-col>
                </v-row>
            </template>

            <template v-slot:footer>
                <v-row class="mt-2" align="center" justify="center">
                    <span class="grey--text">Items per page</span>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                                {{ itemsPerPage }}
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(number, index) in itemsPerPageArray" :key="index"
                                @click="updateItemsPerPage(number)">
                                <v-list-item-title>{{ number }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-spacer></v-spacer>

                    <span class="mr-4 grey--text">
                        Page {{ page }} of {{ numberOfPages }}
                    </span>
                    <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-row>
            </template>
        </v-data-iterator>

        <QuickEditCard />

    </v-container>
</template>


<script>
import axios from 'axios';
import QuickEditCard from './QuickEditCard.vue';
import pageTitle from './partial/Title.vue';


export default {
    components: {
        QuickEditCard,
        pageTitle
    },
    data() {
        return {
            itemsPerPageArray: [4, 8, 12],
            search: '',
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 12,
            sortBy: 'name',
            keys: [
                'Name',
                'Price',
                'Description',
            ],
            showEditCardPopup: false,
            cardToEdit: {},
        }
    },
    computed: {

        numberOfPages() {
            return Math.ceil(this.$store.state.cards.length / this.itemsPerPage)
        },

        filteredKeys() {
            return this.keys.filter(key => key !== 'Name')
        },
    },
    methods: {

        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },

        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1
        },

        updateItemsPerPage(number) {
            this.itemsPerPage = number
        },

        deleteCard(card) {
            console.log('delete card', card);
            if (confirm('Czy na pewno chcesz usunąć tą kartę?')) {
                axios.delete(`/api/${card.id}/cards`)
                    .then(response => {
                        console.log(response.data);
                        this.fetchCardsData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },


    },
    created() {
        this.$store.dispatch('fetchCardsData');
        this.$store.commit('setPageTitle', 'Kartoteki');

    }
}
</script>

