<template>
  <div class="home">
    <v-col>
      <template>
        <Produto v-for="(value, name) in produtos" :id="name" :produto="value" :key="name" />
      </template>
    </v-col>
    <Modal />
  </div>
</template>

<script>
// @ is an alias to /src

import Produto from "@/components/Produto.vue";
import Modal from "@/components/Modal.vue";
import * as firebase from "firebase/app";
import "firebase/database";

export default {
  name: "home",
  components: {
    Produto,
    Modal
  },
  data() {
    return {
      produtos: null
    };
  },
  created() {
    let produtos = firebase.database().ref("produtos/");
    produtos.on("value", snap => {
      console.log(snap.val());
      this.produtos = snap.val();
    });
    
  }
};
</script>
