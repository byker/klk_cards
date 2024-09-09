import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { remove, set } from "lodash";
import router from "../router";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: window.authToken || "",
        pageTitle: "",
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
        productRules: {
            nameRule: [
                (v) => !!v || "Pole wymagane",
                (v) => (v && v.length >= 3) || "Conajmniej 3 znaki",
                (v) => (v && v.length <= 100) || "max 50 znaków",
            ],
            priceRule: [
                (v) => !!v || "Pole wymagane",
                (v) => (v && v >= 0) || "Cena musi być równa lub większa od 0",
            ],
        },
        token: localStorage.getItem("token") || "",
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        },
        setPageTitle( state , title) {
            state.pageTitle = title;
            console.log("state.pageTitle", state.pageTitle);
        },
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

        removeProductFromSelectedCard(state, productId) {
            const index = state.cardSelected.products.findIndex(
                (product) => product.id === productId
            );
            state.cardSelected.products.splice(index, 1);
        },
        setProductSelected(state, product) {
            state.productSelected = product;
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
        fetchProductsNotAssignedToCard({ commit }, cardId) {
            axios
                .get(`/api/products/not-assigned-to-card/${cardId}`)
                .then((response) => {
                    console.log(
                        "products for card",
                        cardId,
                        response.data.products
                    );
                    commit("setProducts", response.data.products);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        fetchSingleCard({ commit, state }, id) {
            axios
                .get(`/api/cards/${id}`)
                .then((response) => {
                    commit("setCardSelected", response.data.card);
                    console.log(
                        "card selected",
                        state.cardSelected.products.length
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        fetchSingleProduct({ commit, state }, id) {
            axios
                .get(`/api/products/${id}`)
                .then((response) => {
                    commit("setProductSelected", response.data.product);
                    console.log("product selected", state.productSelected);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        saveQuickEditCard({ commit, state }) {
            axios
                .put(`/api/cards/${state.cardSelected.id}`, state.cardSelected)
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
        addProductToSelectedCard({ commit, state }) {
            axios
                .put(
                    `/api/products/attach-to-card/${state.productSelected}/${state.cardSelected.id}`
                )
                .then((response) => {
                    commit("addProductToSelectedCard", response.data.product);
                    console.log("product added", state.cardSelected);
                })
                .catch((error) => {
                    console.error("error get product : ", error);
                });
        },

        removeProductFromSelectedCard({ commit, state }, productId) {
            axios
                .put(`/api/products/detach-from-card/${productId}`)
                .then(() => {
                    commit("removeProductFromSelectedCard", productId);
                })
                .catch((error) => {
                    console.error("error remove product : ", error);
                });
        },

        saveCard({ commit, state }) {
            console.log("state.cardSelected", state.cardSelected);
            axios
                .put(`/api/cards/${state.cardSelected.id}`, state.cardSelected)
                .then((response) => {
                    console.log("card saved", response);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        editProduct({ commit, state }, productId) {
            console.log("edit product", productId);
            router.push(`/products/${productId}/edit`);
        },

        saveProduct({ state }) {
            console.log("state.productSelected", state.productSelected);
            axios
                .put(
                    `/api/products/${state.productSelected.id}`,
                    state.productSelected
                )
                .then((response) => {
                    console.log("product saved", response);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    modules: {},
});
if (store.state.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;
}
// Set CSRF token for Axios
const csrfToken = document.head.querySelector('meta[name="csrf-token"]');
if (csrfToken) {
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken.content;
} else {
    console.error("CSRF token not found");
}
export default store;
