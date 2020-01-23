import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#34403F',
            secondary: '#488C87',
            accent: '#728C8A',
          },
        },
      },
});
