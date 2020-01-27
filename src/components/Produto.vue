<template>
  <div class="produto">
    <v-card width="300" :class="[{accent: produto.comprado}]">
      <v-img aspect-ratio="1.5" contain :src="produto.imagem"></v-img>

      <v-card-title class="headline">{{ produto.produto }}</v-card-title>
      <v-card-subtitle class="headline">R$ {{ produto.preco }}</v-card-subtitle>
      <v-btn v-if="usuario" icon color="secondary" @click="comprar" absolute right>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-card-text class="text--primary">
        <div class="descricao">{{ produto.descricao}}</div>
      </v-card-text>

      <v-card-actions>
        <Modal tipo="edit" :produto="produto" :id="id" />

        <Modal tipo="delete" :produto="produto" :id="id" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import * as firebase from "firebase/app";
import "firebase/database";

export default {
  name: "produto",
  components: {
    Modal
  },
  data() {
    return {
      editar: false
    };
  },
  props: {
    produto: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    usuario() {
      this.$store.dispatch('verificarLogin');
      return this.$store.state.logado;
    }
  },
  methods: {
    comprar() {
      firebase
        .database()
        .ref("produtos/")
        .child(this.id)
        .update({
          comprado: true
        })
        .then(
          sucess => {
            console.log(sucess);
          },
          error => {
            console.log(error);
          }
        );
    }
  }
};
</script>

<style>
.produto {
  float: left;
  margin: 20px;
}
.descricao {
  margin-right: 45px;
}
</style>