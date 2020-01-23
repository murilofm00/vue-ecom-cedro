<template>
<div class="produto">
  <v-card max-width="300">
    <v-img
      class="white--text align-center"
      height="180px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    ></v-img>

    <v-card-title class="headline">{{ nome }}</v-card-title>
    <v-card-subtitle class="headline">R$ {{ preco }}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text @click="editar = true">Share</v-btn>

      <v-btn color="orange" text>Explore</v-btn>
    </v-card-actions>
  </v-card>
  
<Modal :dialog="editar"/>
</div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "produto",
  components: {
    Modal
  },
  data() {
    return {
      editar: false
    }
  },
  props: {
    nome: {
      type: String,
      default: 'Produto'
    },
    imagem: {
      type: String,
      default: 'aaa'
    },
    preco: {
      type: Number,
      default: 0
    },
    descricao: {
      type: String,
      default: 'descrição'
    }
  }
};
</script>

<style>
.produto {
  float: left;
  margin: 20px;
}
</style>