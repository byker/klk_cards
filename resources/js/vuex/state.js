const state= {
    pageTitle: "",
    cards: [],
    cardSelected: {},
    products: [],
    productSelected: {},
    showEditCardPopup: false,
    activationBtnText: "",
    acceptationBtnText: "",
    isLoggedIn: false,
    
    login: {
        email: "",
        password: "",
    },
    loginError: null,
    currentUser: {},
    loginRules: {
        emailRule: [
            (v) => !!v || "Pole wymagane",
            (v) => /.+@.+\..+/.test(v) || "Niepoprawny adres email",
        ],
        passwordRule: [(v) => !!v || "Pole wymagane"],
    },
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
} 
export default state;