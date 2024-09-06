import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { set } from "lodash";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        cards: [],
        cardSelected: {},
        showEditCardPopup: false,
        activationBtnText: "Aktywuj kartotekę",
        acceptationBtnText: "Zatwierdź kartotekę",
    },
    mutations: {

        setCards(state, cards) {
            state.cards = cards;
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

        setCardToEdit(state, card) {
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
        fetchSingleCard({ commit, state }) {
            axios
                .get(`/api/${state.cardSelected.id}/cards`)
                .then((response) => {
                    commit("setCards", response.data.cards);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        saveCard({ commit, state }) {
            axios
                .put(`/api/${state.cardSelected.id}/cards`, state.cardSelected)
                .then(() => {
                    commit("setShowEditCardPopup", false);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        
        createCard({ commit, state }) {
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
    },
    modules: {},
});

export default store;
