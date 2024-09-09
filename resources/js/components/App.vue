<template>
<v-app>
  <v-container>
    <v-row class="justify-content-end mt-3">
      <v-col class="col-auto">
        <v-btn @click="$router.push('/')" small>Kartoteki</v-btn>
      </v-col>
      <v-col class="col-auto">
        <v-btn @click="$store.dispatch('logout')"small>Wyloguj się</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <router-view></router-view>
</v-app>

  </template>
  
  <script>
  export default {
    name: 'App'
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>