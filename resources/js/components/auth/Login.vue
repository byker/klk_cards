<template>
    <v-sheet class="blue pa-12 height-100vh d-flex align-items-center" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-card-title class="text-h5 text-center">Zaloguj się</v-card-title>
            <v-form @submit.prevent="$store.dispatch('proceedAuthentication')">
                <v-text-field v-model="$store.state.login.email" 
                    :rules="$store.state.loginRules.emailRule" class="mb-2" label="Email" clearable></v-text-field>

                <v-text-field v-model="$store.state.login.password" 
                    :rules="$store.state.loginRules.passwordRule" label="Password" placeholder="Enter your password"
                    clearable></v-text-field>

                <br>
                <v-alert v-if="$store.state.login.error" type="error" dismissible>
                    {{$store.state.login.error}}
                </v-alert>

                <v-btn color="success" size="large" type="submit"
                    variant="elevated" block>
                    Zaloguj
                </v-btn>
            </v-form>
        </v-card>
    </v-sheet>
</template>

