<template>
  <v-app>
    <v-container v-if="$store.state.isLoggedIn == true">
      <v-row class="justify-content-end align-items-center mt-3">
        <v-col cols="12" md="auto">
          <v-card-text class="d-flex justify-content-end justify-content-md-end">Witaj, {{ $store.state.currentUser.name }}</v-card-text>
        </v-col>
        <v-col class="col-auto" >
          <v-btn v-if="$route.path !== '/'" @click="$router.push('/')" small>Kartoteki</v-btn>
          <v-btn v-if="$route.path === '/'"  small class="primary">Kartoteki</v-btn>
        </v-col>
        <v-col class="col-auto">
          <v-btn @click="$store.dispatch('logout')" small>Wyloguj się</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <router-view></router-view>
  </v-app>

</template>