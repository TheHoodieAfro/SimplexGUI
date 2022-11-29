<template>
  <div class="center">
    <v-expansion-panels>
      <v-expansion-panel v-for="rank in ranks" :key="rank.id">
        <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
          {{ rank.id }}
          <v-spacer></v-spacer>
          {{ rank.total_points }} points
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          accuracy: {{ rank.accuracy }}<br>
          f1: {{ rank.f1 }}<br>
          precision: {{ rank.precision }}<br>
          kappa: {{ rank.kappa }}<br>
        </v-expansion-panel-text>
      </v-expansion-panel>

    </v-expansion-panels>
  </div>
</template>
  
<script>
import UserService from "../services/user.service";

export default {
  name: "HomeView",
  data() {
    return {
      ranks: null,
    };
  },
  mounted() {
    UserService.getRanks().then(
      (response) => {
        this.ranks = response.data;
      },
      (error) => {
        this.ranks =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>

<style scoped>
.center {
  margin: auto;
  width: 100%;
  padding: 20px;
}
</style>