<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800">
      <template v-slot:activator="{ on }">
        <v-btn v-if="tipo === 'edit'" icon color="orange" dark v-on="on">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-else-if="tipo === 'delete'" icon color="red" dark v-on="on">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn v-else color="secondary" absolute dark fab right v-on="on" style="bottom: 10px;">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title v-if="tipo === 'edit'">Editar produto</v-toolbar-title>
          <v-toolbar-title v-else-if="tipo === 'delete'">Remover produto</v-toolbar-title>
          <v-toolbar-title v-else>Adicionar produto</v-toolbar-title>
          <v-spacer />
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn icon large v-on="on" @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>Fechar</span>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <template v-if="tipo === 'delete'">
              <v-row align="center">
                <v-col>
                  <v-avatar tile size="200">
                    <v-img
                      class="white--text align-center"
                      height="200px"
                      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    ></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <p class>Deseja remover o seguinte produto?</p>
                  <div class="produto">
                    <b>Teste</b>
                  </div>
                </v-col>
              </v-row>
            </template>
            <template v-else>
              <v-img
                v-if="tipo === 'edit'"
                class="white--text align-center"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              ></v-img>
              <img v-if="imgPreview" :src="imgPreview" alt />
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-file-input
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Avatar"
                  v-model="nImagem"
                  @change="convertBase64"
                  :rules="[v => !!v || 'Adicione uma imagem!']"
                ></v-file-input>
                <v-text-field
                  v-model="produto"
                  :rules="[v => !!v || 'Digite o nome do produto!']"
                  label="Produto"
                  required
                ></v-text-field>
                <v-textarea v-model="nDescricao" label="Descrição" required></v-textarea>
                <v-text-field v-model="nPreco" type="number" label="Preco" required></v-text-field>

                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

                <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

                <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
              </v-form>
            </template>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <template v-if="tipo === 'delete'">
            <v-btn color="red">
              <v-icon>mdi-content-save</v-icon>Remover
            </v-btn>
          </template>
          <v-btn v-else color="secondary">
            <v-icon>mdi-content-save</v-icon>Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from 'firebase';
let db = firebase.database();
export default {
  props: {
    nome: {
      type: String,
      default: ""
    },
    imagem: {
      type: String
    },
    preco: {
      type: Number,
      default: 0.0
    },
    descricao: {
      type: String,
      default: ""
    },
    tipo: {
      type: String,
      default: "new"
    }
  },
  data() {
    return {
      dialog: false,
      valid: true,
      produto: "",
      nDescricao: this.descricao,
      nPreco: this.preco,
      nImagem: null,
      imgPreview: ""
    };
  },
  methods: {
    convertBase64(file) {
      let reader = new FileReader();

      reader.onloadend = function() {
        this.imgPreview = reader.result;
        console.log(this.imgPreview);
      };
      reader.readAsDataURL(file);
    },
    validate() {
      if (this.$refs.form.validate()) {
        db.ref("produtos/").set({
          produto: this.nProduto,
          descricao: this.nDescricao,
          preco: this.nPreco,
          imagem: this.imgPreview
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style>
.produto {
  font-size: 3em !important;
}
</style>