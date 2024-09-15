import axios from "axios";
import router from "../router";

const actions = {
    proceedAuthentication({ commit, state }) {
        axios
            .post("/api/login", state.login)
            .then((response) => {
                commit("setToken", response.data.token);
                window.location = "/";
            })
            .catch((error) => {
                commit("dispatchLoginError", "Niepoprawne dane logowania");
            });
    },
    logout({ commit }) {
        axios
            .post("/api/logout")
            .then((response) => {
            })
            .catch((error) => {
            });
        commit("setToken", "");
        router.push("/login");
    },

    setCurrentUser({ commit }) {
        axios
            .get("/api/user")
            .then((response) => {
                commit("setCurrentUser", response.data.user);
            })
            .catch((error) => {
                console.log('error');
            });
    },

    fetchCardsData({ commit, state }) {
        axios
            .get("/api/cards")
            .then((response) => {
                commit("setCards", response.data.cards);
            })
            .catch((error) => {
                console.log('error');
            });
    },
    fetchProductsNotAssignedToCard({ commit }, cardId) {
        axios
            .get(`/api/products/not-assigned-to-card/${cardId}`)
            .then((response) => {

                commit("setProducts", response.data.products);
            })
            .catch((error) => {
                console.log('error');
            });
    },
    fetchSingleCard({ commit, state }, id) {
        axios
            .get(`/api/cards/${id}`)
            .then((response) => {
                commit("setCardSelected", response.data.card);

            })
            .catch((error) => {
                console.log('error');
            });
    },
    fetchSingleProduct({ commit, state }, id) {
        axios
            .get(`/api/products/${id}`)
            .then((response) => {
                commit("setProductSelected", response.data.product);
            })
            .catch((error) => {
                console.log('error');
            });
    },

    saveQuickEditCard({ commit, state }) {
        axios
            .put(`/api/cards/${state.cardSelected.id}`, state.cardSelected)
            .then(() => {
                commit("setShowEditCardPopup", false);
            })
            .catch((error) => {
                console.error('error');
            });
    },

    createQuickEditCard({ commit, state }) {
        axios
            .post(`/api/cards`, state.cardSelected)
            .then((response) => {
                commit("setShowEditCardPopup", false);
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
                    console.log('error');
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
            })
            .catch((error) => {
                console.error("error ");
            });
    },

    removeProductFromSelectedCard({ commit, state }, productId) {
        axios
            .put(`/api/products/detach-from-card/${productId}`)
            .then(() => {
                commit("removeProductFromSelectedCard", productId);
            })
            .catch((error) => {
            });
    },

    saveCard({ commit, state }) {
        axios
            .put(`/api/cards/${state.cardSelected.id}`, state.cardSelected)
            .then((response) => {
                router.push("/");
            })
            .catch((error) => {
                console.error(error);
            });
    },

    editProduct({ commit, state }, productId) {
        router.push(`/products/${productId}/edit`);
    },

    saveProduct({ state }) {
        axios
            .put(
                `/api/products/${state.productSelected.id}`,
                state.productSelected
            )
            .then((response) => {
                router.push("/");
            })
            .catch((error) => {
                console.error(error);
            });
    },
};
export default actions;
