<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800" v-if="logado">
      <template v-slot:activator="{ on }">
        <v-btn v-if="tipo === 'edit'" icon color="orange" dark v-on="on">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-else-if="tipo === 'delete'" icon color="red" dark v-on="on">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn v-else color="secondary" fixed dark fab right v-on="on" style="bottom: 65px;">
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
              <v-btn icon large v-on="on" @click="close()">
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
                    <v-img class="white--text align-center" height="200px" :src="img"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <p class>Deseja remover o seguinte produto?</p>
                  <div class="produto">
                    <b>{{ produto.produto }}</b>
                  </div>
                </v-col>
              </v-row>
              <v-spacer />
              <v-btn color="red" @click="remover">
                <v-icon>mdi-content-save</v-icon>Remover
              </v-btn>
            </template>
            <template v-else>
              <v-img v-if="img" max-height="300px" contain :src="img"></v-img>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-file-input
                  v-if="tipo === 'edit'"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Selecione uma imagem"
                  prepend-icon="mdi-camera"
                  label="Imagem"
                  v-model="nImagem"
                  @change="convertBase64"
                ></v-file-input>
                <v-file-input
                  v-else
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Selecione uma imagem"
                  prepend-icon="mdi-camera"
                  label="Imagem"
                  v-model="nImagem"
                  @change="convertBase64"
                  :rules="[v => !!v || 'Adicione uma imagem!']"
                ></v-file-input>
                <v-text-field
                  v-model="nProduto"
                  :rules="[v => !!v || 'Digite o nome do produto!']"
                  label="Produto"
                  required
                ></v-text-field>
                <v-textarea v-model="nDescricao" label="Descrição" required></v-textarea>
                <v-text-field v-model="nPreco" type="number" label="Preco" required></v-text-field>

                <v-btn :disabled="!valid" @click="validate" color="secondary">
                  <v-icon>mdi-content-save</v-icon>Salvar
                </v-btn>
              </v-form>
            </template>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import * as firebase from "firebase/app"
import "firebase/database"
export default {
  props: {
    produto: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: null
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
      nProduto: "",
      nDescricao: "",
      nPreco: "",
      nImagem: null,
      img: ""
    };
  },
  created() {
    if (this.produto) {
      this.nProduto = this.produto.produto;
      this.nDescricao = this.produto.descricao;
      this.nPreco = this.produto.preco;
      this.img = this.produto.imagem;
    }
  },
  computed: {
    logado() {
      return this.$store.state.logado;
    }
  },
  methods: {
    convertBase64(file) {
      let reader = new FileReader();

      reader.onloadend = data => {
        this.img = data.target.result;
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        if (this.tipo === "edit") {
          this.img = this.produto.imagem;
        } else {
          this.img = null;
        }
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.enviar();
      }
    },
    enviar() {
      let key;
      if (this.tipo === "new") {
        key = firebase
          .database()
          .ref("produtos/")
          .push().key;
      } else {
        key = this.id;
      }
      firebase
        .database()
        .ref("produtos/")
        .child(key)
        .set({
          produto: this.nProduto,
          descricao: this.nDescricao,
          preco: this.nPreco,
          imagem: this.img
        })
        .then(sucess => {
          console.log(sucess);
        });
      this.close();
    },
    remover() {
      firebase
        .database()
        .ref("produtos/")
        .child(this.id)
        .remove();
    },
    close() {
      if (this.tipo != "delete") {
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
      this.dialog = false;
    }
  }
};
</script>

<style>
.produto {
  font-size: 3em !important;
}
</style>