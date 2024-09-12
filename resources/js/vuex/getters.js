import { has } from "lodash";

const getters = {
    currentUserCan: (state) => (permission) => {
        if (state.currentUser.permissions) {
            console.log(
                "state.currentUser.permissions",
                permission,
                state.currentUser.permissions,
                state.currentUser.permissions.includes(permission)
            );
            return state.currentUser.permissions.includes(permission);
        }
        return false;
    },
    checkCardActivationPossible: (state) => {
        const card = state.cardSelected;
        const isActive = card.is_active;
        const isAccepted = card.accepted;
        const hasProducts = card.products.length > 0;
        console.log(
            "isActive",
            isActive,
            "isAccepted",
            isAccepted,
            "hasProducts",
            hasProducts
        );

        let response1 = false;
        let response2 = false;

        if (hasProducts) {
            response1 = true;
        }
        if (isActive && isAccepted) {
            response2 = false;
        } else if (!isActive && !isAccepted) {
            response2 = true;
        } else if (isActive && !isAccepted) {
            response2 = true;
        } else if (isActive && isAccepted) {
            response2 = false;
        }
        console.log("checkCardActivation", response1, response2);
        if (response1 && response2) {
            return true;
        }
        return false;
    },
    checkCardAcceptationPossible: (state) => {
        const card = state.cardSelected;
        const isActive = card.is_active;
        const isAccepted = card.accepted;
        const hasTitle = card.name.length > 0;
        console.log(
            "isActive",
            isActive,
            "isAccepted",
            isAccepted,
            "hasTitle",
            hasTitle
        );

        let response1 = false;
        let response2 = false;

        if (hasTitle) {
            response1 = true;
        }

        if (isActive && isAccepted) {
            response2 = true;
        } else if (!isActive && !isAccepted) {
            response2 = false;
        } else if (isActive && !isAccepted) {
            response2 = true;
        } else if (isActive && isAccepted) {
            response2 = true;
        }
        console.log("checkCardAcceptation", response1, response2);
        if (response1 && response2) {
            return true;
        }
        return false;
    },
    checkAddProductToCardPossible: (state) => {
        const card = state.cardSelected;
        const isActive = card.is_active;

        let response = false;

        if (isActive) {
            response = true;
        }
        return response;
    },
    checkDeleteCardPossible: (state) => {
        const card = state.cardSelected;
        const isActive = card.is_active;

        let response = false;

        if (!isActive) {
            response = true;
        }

        return response;
    },
};
export default getters;
