const mutations = {
    setToken(state, token) {
        localStorage.setItem("token", token);
        state.token = token;
    },
    setIsLoggedIn(state, value) {
        console.log("value", value);
        state.isLoggedIn = value;
    },
    setCurrentUser(state, user) {
        state.currentUser = user;
    },

    dispatchLoginError(state, message) {
        state.loginError = message;
    },
    setPageTitle(state, title) {
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
    },

    toggleCardAcceptation(state) {
        state.cardSelected.accepted = !state.cardSelected.accepted;
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

};
export default mutations;