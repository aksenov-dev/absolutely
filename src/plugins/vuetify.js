import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
    iconfont: 'mdi',
	},
	theme: {
    themes: {
      light: {
        primary: colors.indigo.lighten1,
        secondary: colors.indigo.lighten5,
				error: colors.red.accent2,
				success: colors.teal.accent3,
				accent: colors.blueGrey.darken3
      }
    }
  }
});
