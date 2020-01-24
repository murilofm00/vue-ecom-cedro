<template>
  <div class="home">
    <v-col>
      <Produto nome="Teste" />
    </v-col>
    <Modal />
  </div>
</template>

<script>
// @ is an alias to /src

import Produto from "@/components/Produto.vue";
import Modal from '@/components/Modal.vue'

export default {
  name: "home",
  components: {
    Produto,
    Modal
  },
  computed: {
    produtos() {
      return this.$firebase;
    }
  }
};
</script>
