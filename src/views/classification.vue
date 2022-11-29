<template>
    <div class="center">
        <v-autocomplete label="Datasets" :items="datas" v-model="selected">
        </v-autocomplete>
        <v-autocomplete label="Classification models" :items="['simplex', 'knn', 'tree']" v-model="model">
        </v-autocomplete>
        <v-btn color="warning" @click="executeModel">
            Train & Test
        </v-btn>
        <p>{{ results }}</p>
    </div>
</template>
  
<script>
import { storage } from "../services/firebase.js";
import { ref, listAll } from "firebase/storage";
import UserService from "../services/user.service";

export default {
    name: 'ClassificationView',
    data() {
        return {
            datas: [],
            selected: '',
            model: '',
            results: ''
        }
    },
    methods: {
        executeModel() {
            UserService.executeModel(this.model, this.selected).then(
                (response) => {
                    this.results = response.data;
                },
                (error) => {
                    this.results =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        }
    },
    mounted() {

        const listRef = ref(storage, 'data/');

        listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    var path = itemRef._location.path_
                    var filename = path.split('\\').pop().split('/').pop()
                    this.datas.push(filename)
                });
            }).catch((error) => {
                console.log(error)
            });
    }
};
</script>

<style scoped>
.center {
    margin: auto;
    width: 100%;
    padding: 20px;
}
</style>