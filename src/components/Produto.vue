<template>
<div class="produto">
  <v-card width="300">
    <v-img
      aspect-ratio="1.5" contain
      :src="produto.imagem"
    ></v-img>

    <v-card-title class="headline">{{ produto.produto }}</v-card-title>
    <v-card-subtitle class="headline">R$ {{ produto.preco }}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ produto.descricao}}</div>
    </v-card-text>

    <v-card-actions>
      <Modal tipo="edit" :produto="produto" :id="id"/>

      <Modal tipo="delete" :produto="produto" :id="id"/>
    </v-card-actions>
  </v-card>
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
    produto: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
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