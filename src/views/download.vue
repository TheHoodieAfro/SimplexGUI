<template>
    <div class="center">
        <v-autocomplete label="Datasets" :items="datas" v-model="selected">
        </v-autocomplete>
        <button @click="downloadFile">Download</button>
    </div>
</template>
  
<script>
import { storage } from "../services/firebase.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export default {
    name: 'DownloadView',
    data() {
        return {
            datas: [],
            selected: ''
        }
    },
    methods: {
        downloadFile() {
            getDownloadURL(ref(storage, 'data/' + this.selected))
                .then((url) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    /*xhr.onload = (event) => {
                        const blob = xhr.response;
                    };*/
                    xhr.open('GET', url);
                    xhr.send();
                })
                .catch((error) => {
                    console.log(error)
                });
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