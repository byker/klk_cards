<template>
    <v-col cols="auto">
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="$store.state.showEditCardPopup">
            <template v-slot:default="dialog">
                <v-card>
                    <v-container>
                        <v-toolbar color="primary" dark>
                            <h3> Edytuj kartę </h3>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Nazwa" v-model="$store.state.cardSelected.name"></v-text-field>
                                <v-btn v-if="$store.getters.checkCardActivationPossible == true" @click="$store.commit('toggleCardActivation')">
                                    <span v-if="$store.state.cardSelected.is_active == true">Dezaktywuj</span>
                                    <span v-else>Aktywuj</span>
                                </v-btn>
                                <v-btn v-if="$store.getters.checkCardAcceptationPossible == true" @click="$store.commit('toggleCardAcceptation')">
                                    <span v-if="$store.state.cardSelected.accepted == true">Odtwierdź</span>
                                    <span v-else>Zatwierdź</span>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-card-actions class="justify-end">
                            <v-btn text @click="dialog.value = false">Zamknij</v-btn>
                            <v-btn v-if="(typeof($store.state.cardSelected.id) != 'undefined')" @click="$store.dispatch('saveQuickEditCard',false)">Zapisz</v-btn>
                            <v-btn v-if="(typeof($store.state.cardSelected.id) == 'undefined')" @click="$store.dispatch('createQuickEditCard')">Dodaj</v-btn>
                        </v-card-actions>
                    </v-container>
                </v-card>
            </template>
        </v-dialog>
    </v-col>
</template>
<script>
export default {

}
</script>