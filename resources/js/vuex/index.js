import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { set } from "lodash";
import router from "../router";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        cards: [],
        cardSelected: {},
        products: [],
        productSelected: {},
        showEditCardPopup: false,
        activationBtnText: "Aktywuj kartotekę",
        acceptationBtnText: "Zatwierdź kartotekę",
        cardRules: {
            nameRule: [
                (v) => !!v || "Pole wymagane",
                (v) => (v && v.length >= 3) || "Conajmniej 3 znaki",
                (v) => (v && v.length <= 100) || "max 100 znaków",
            ],
        },
    },
    mutations: {
        setCards(state, cards) {
            state.cards = cards;
        },

        setProducts(state, products) {
            state.products = products;
        },

        setShowEditCardPopup(state, newValue) {
            state.showEditCardPopup = newValue;
        },

        setCardEdit(state, newValues) {
            state.showEditCardPopup = newValues.showEditCardPopup;
            state.cardSelected = newValues.cardToEdit;
        },

        setNewCard(state) {
            state.showEditCardPopup = true;
            state.cardSelected = {};
        },

        setCardSelected(state, card) {
            state.cardSelected = card;
        },

        toggleCardActivation(state) {
            state.cardSelected.is_active = !state.cardSelected.is_active;
            state.activationBtnText = state.cardSelected.is_active
                ? "Dezaktywuj kartotekę"
                : "Aktywuj kartotekę";
        },

        toggleCardAcceptation(state) {
            state.cardSelected.accepted = !state.cardSelected.accepted;
            state.acceptationBtnText = state.cardSelected.accepted
                ? "Zatwierdź kartotekę"
                : "Odtwierdź kartotekę";
        },
        addProductToSelectedCard(state, product) {
            state.cardSelected.products.push(product);
        },
    },
    getters: {
        cards: (state) => state.cards,
    },
    actions: {
        fetchCardsData({ commit }) {
            axios
                .get("/api/cards")
                .then((response) => {
                    console.log(response.data.cards);
                    commit("setCards", response.data.cards);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        fetchProductsData({ commit }) {
            axios
                .get("/api/products")
                .then((response) => {
                    console.log(response.data.products);
                    commit("setProducts", response.data.products);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        fetchSingleCard({ commit, state }, id) {
            axios
                .get(`/api/${id}/cards`)
                .then((response) => {
                    console.log(response.data);
                    commit("setCardSelected", response.data.card);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        saveQuickEditCard({ commit, state }) {
            axios
                .put(`/api/${state.cardSelected.id}/cards`, state.cardSelected)
                .then(() => {
                    commit("setShowEditCardPopup", false);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        createQuickEditCard({ commit, state }) {
            axios
                .post(`/api/cards`, state.cardSelected)
                .then((response) => {
                    commit("setShowEditCardPopup", false);
                    console.log("Card created", response);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        editCard({ commit, state }, card) {
            commit("setCardSelected", state.cardSelected);
            router.push(`/cards/${card.id}/edit`);
        },

        saveCard({ commit, state }, id) {
          if(typeof(id) !== 'undefined'){
            axios
            .get(`/api/${id}/products`, id)
            .then((response) => {
              commit("addProductToSelectedCard", response.data.product);
            })
            .catch((error) => {
              console.error(error);
            });
          }
            
            axios
                .put(`/api/${state.cardSelected.id}/cards`, state.cardSelected)
                .then((response) => {
                    console.log("card saved", response);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    modules: {},
});

export default store;
