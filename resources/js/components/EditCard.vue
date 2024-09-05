<template>
    <v-col cols="auto">
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogVisible">
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar color="primary" dark>Edytuj kartę</v-toolbar>
                    <v-row>
                        <v-col cols="12">

                            <v-text-field label="Nazwa" v-model="card.name"></v-text-field>
                            <v-btn @click="toggleActivation">{{ activationBtnText }}</v-btn>
                        </v-col>
                    </v-row>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false">Zamknij</v-btn>
                        <v-btn text @click="saveCard()">Zapisz</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-col>
</template>
<script>
export default {
    props: {
        open: {
            type: Boolean,
            required: true,
            default: false
        },
        card: {
            type: Object,
            required: true
        },

    },
    data() {
        return {
            activationBtnText: 'Aktywuj',
        }
    },

    methods() {
        const getCard = () => {

        };
        const setCard = () => { };

        const toggleActivation = () => {
            this.card.active = !this.card.active;
            this.activationBtnText = this.card.active ? 'Dezaktywuj' : 'Aktywuj';
        }
    },

    computed: {
        dialogVisible: {
            get() {
                return this.open;
            },
            set(value) {
                this.$emit('update:open', value);
            }
        },

    }
}
</script>