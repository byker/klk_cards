import axios from "axios";
import router from "../router";

const actions = {
    proceedAuthentication({ commit, state }) {
        axios
            .post("/api/login", state.login)
            .then((response) => {
                console.log("response", response);
                commit("setToken", response.data.token);
                window.location = "/";
            })
            .catch((error) => {
                commit("dispatchLoginError", "Niepoprawne dane logowania");
                console.error("error", error);
            });
    },
    logout({ commit }) {
        axios
            .post("/api/logout")
            .then((response) => {
                console.log("logged out", response);
            })
            .catch((error) => {
                console.error("error", error);
            });
        commit("setToken", "");
        router.push("/login");
    },

    setCurrentUser({ commit }) {
        axios
            .get("/api/user")
            .then((response) => {
                commit("setCurrentUser", response.data.user);
                console.log("user", response.data.user);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    fetchCardsData({ commit, state }) {
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
    deleteCard({ dispatch }, card) {
        if (confirm("Czy na pewno chcesz usunąć tą kartę?")) {
            axios
                .delete(`/api/cards/${card.id}`)
                .then((response) => {
                    dispatch("fetchCardsData");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
                router.push("/");
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
};
export default actions;
