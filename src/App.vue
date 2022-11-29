<template>
  <v-app :theme="theme">
    <v-layout>

      <v-app-bar>
        <v-toolbar-title>Online Classifier</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="onClick">
          Toggle Theme
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" :rail="rail" permanent>
        <div v-if="!currentUser">
          <v-list-item to="/profile"
            prepend-avatar="https://cdn.icon-icons.com/icons2/37/PNG/512/Guest_theapplication_2906.png" title="Guest"
            nav>
          </v-list-item>
        </div>
        <div v-if="currentUser">
          <v-list-item to="/profile"
            prepend-avatar="https://i.pinimg.com/originals/ea/c6/ed/eac6ed9a072d44a6fefc06dccaa9d795.jpg"
            :title=currentUser.username nav>
          </v-list-item>
        </div>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item to="/home" prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
          <v-list-item to="/instructions" prepend-icon="mdi-file-alert" title="Intructions" value="intructions"></v-list-item>
          <v-list-item to="/classification" prepend-icon="mdi-graphql" title="Clasification" value="clasification"></v-list-item>
          <v-list-item to="/upload" prepend-icon="mdi-database-arrow-up" title="Upload data" value="uploadData"></v-list-item>
          <v-list-item to="/download" prepend-icon="mdi-database-arrow-down" title="Download data" value="downloadData"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <div v-if="!currentUser">
              <v-btn block to="/register">
                Sign up
              </v-btn>
              <v-btn block to="/login">
                Login
              </v-btn>
            </div>
            <div v-if="currentUser">
              <v-btn block @click.prevent="logOut">
                Logout
              </v-btn>
            </div>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>

    </v-layout>
  </v-app>
</template>

<script>
import { ref } from 'vue'


export default {
  data() {
    return {
      drawer: true,
      rail: false,

      theme: ref('light')
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    onClick() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
  }
};
</script>