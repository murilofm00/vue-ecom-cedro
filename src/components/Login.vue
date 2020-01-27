<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <template v-if="usuario">
                  <div class="center">Você já está logado</div>
                </template>

                <v-form v-else v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="email"
                    :rules="[v => !!v || 'Digite o endereço de e-mail', v => /.+@.+\..+/.test(v) || 'E-mail precisa ser válido', !erro || '']"
                    label="E-mail"
                    @click="erro = false"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="senha"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[value => !!value || 'Digite a senha.', !erro || '']"
                    :type="show ? 'text' : 'password'"
                    label="Senha"
                    class="input-group--focused"
                    @click:append="show = !show"
                    @click="erro = false"
                    required
                  ></v-text-field>
                  <div class="mb-4 red--text" v-if="erro">{{ this.erroMsg }}</div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn v-if="usuario" @click="logout">Desconectar</v-btn>
                <v-btn v-else :disabled="!valid" color="secondary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  props: {
    source: String
  },
  data() {
    return {
      show: false,
      valid: true,
      email: null,
      senha: null,
      erro: false,
      erroMsg: ""
    };
  },
  computed: {
    usuario() {
      this.$store.dispatch('verificarLogin');
      return this.$store.state.logado;
    }
  },
  methods: {
    login() {
      if (this.email && this.senha) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.senha)
          .then(
            () => {
              this.$router.push("/");
            },
            () => {
              this.erro = true;
            }
          );
      }
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('logout');
        })
    }
  }
};
</script>