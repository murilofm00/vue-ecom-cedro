<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-store</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Loja</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/login">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Cedro</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">
        &copy; 2020 Murilo Fernandes Melo
        <a
          href="mailto:murilofm2010@gmail.com"
          target="_blank"
          style="color: white !important;"
        >murilofm2010@gmail.com</a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {},
  data: () => ({
    drawer: null
  })
};
</script>
