<template>
  <b-modal id="edit" hide-footer title="Edit Product" @hidden="resetImage">
    <form @submit.prevent="edit" ref="form">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-avatar class="m-2" size="65" :tile="true" color="#39387a">
            <img :src="image_url" width="5px" alt />
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="6" md="8">
          <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            placeholder="New Image"
            :rounded="true"
            v-model="file"
          ></v-file-input>
        </v-col>
      </v-row>

      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-text-field v-model="category" label="Category"></v-text-field>
      <v-text-field v-model="price" label="Price" type="number"></v-text-field>
      <v-text-field v-model="stock" type="number" label="Stock"></v-text-field>
      <v-btn
        class="mr-4"
        @click="$bvModal.hide('edit')"
        type="submit"
        style="background-color:#39387a;color:white;"
      >Edit</v-btn>
    </form>
  </b-modal>
</template>
<script>
import { axios, errorHandler } from "../config/axios";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
export default {
  data() {
    return {
      name: "",
      file: null,
      image_url: "",
      category: "",
      price: "",
      stock: "",
      id: "",
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Image size should be less than 2 MB!"
      ]
    };
  },
  computed: {
    one() {
      return this.$store.state.oneProduct;
    }
  },
  watch: {
    one() {
      this.name = this.one.name;
      this.image_url = this.one.image_url;
      this.category = this.one.category;
      this.price = this.one.price;
      this.stock = this.one.stock;
      this.id = this.one.id;
    }
  },
  methods: {
    async edit() {
      try {
        let formData = new FormData();
        formData.append("name", this.name);
        formData.append("file", this.file);
        formData.append("category", this.category);
        formData.append("price", Number(this.price));
        formData.append("stock", Number(this.stock));
        let { data } = await axios({
          method: "put",
          url: `/products/${this.id}`,
          data: formData,
          headers: {
            access_token: localStorage.access_token
          }
        });
        if (data) {
          this.$store.dispatch("get");
          this.resetImage();
          Toast.fire({
            icon: "success",
            title: "Product has been edited."
          });
        }
      } catch (error) {
        errorHandler(error);
      }
    },
    resetImage() {
      let resetImage = null;
      this.file = resetImage;
    }
  }
};
</script>