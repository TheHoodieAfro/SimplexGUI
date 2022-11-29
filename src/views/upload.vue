<template>
    <div class="center">
        <v-form ref="form" enctype="multipart/form-data" lazy-validation>

            <v-file-input @change="selectFile($event)" accept=".csv" clearable label="Select csv" required>
            </v-file-input>

            <v-btn color="warning" @click="uploadFile">
                Upload
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import { storage } from "../services/firebase.js";
import { ref, uploadBytes } from "firebase/storage";

export default {
    name: 'UploadView',
    data() {
        return {
            files: [],
            file: null,
        }
    },
    methods: {
        selectFile(e) {
            this.file = e.target.files[0]
        },

        uploadFile() {
            const metadata = {
                contentType: 'text/csv',
            };

            const fileRef = ref(storage, 'data/' + this.file.name)

            uploadBytes(fileRef, this.file, metadata)
        }
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