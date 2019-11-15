<template>
  <div>
    <v-app-bar flat app class="secondary">
			
			<!-- hamburger icon -->
      <v-app-bar-nav-icon class="blue-grey--text text--lighten-2 hidden-md-and-up" 
				@click="drawer = !drawer"
			></v-app-bar-nav-icon>

			<!-- logo -->
			<router-link to="/" class="d-flex td-none">
				<v-img 
					class="ml-md-4 ml-sm-0 mt-1" 
					max-width="23" 
					max-height="23" 
					src="@/assets/icon.png"
				></v-img>
				<v-toolbar-title class="text-uppercase accent--text pl-2">
					<span>Absolutely</span>
				</v-toolbar-title>
			</router-link>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" color="grey" class="hidden-sm-and-down hover-none">
            <v-icon left>mdi-chevron-down</v-icon>
            <span class="blue-grey--text text--lighten-2">Тесты</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item dense v-for="(link, i) in links" :key="i" :to="link.route">
            <v-list-item-title class="accent--text body-1">
							{{ link.text }}
						</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>

		<!-- navigation drawer -->
    <v-navigation-drawer app temporary color="primary" v-model="drawer">
      <v-row justify="center" class="ml-3">
        <v-col cols="auto" class="mt-5">
          <v-avatar size="100">
            <img src="@/assets/logo.png" alt="logo" />
          </v-avatar>
          <p class="white--text text-center title mt-2 mb-1">Тесты</p>
        </v-col>
				<v-col cols="auto">
				</v-col>
      </v-row>
      <v-list>
        <v-list-item v-for="(link, i) in links" :key="i" :to="link.route">
          <v-list-item-icon class="mr-6">
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </div>
</template>

<script>
export default {
	props: {
		links: {
			type: Array,
			required: true
		}
	},
  data() {
    return {
      drawer: false
    }
	}
}
</script>

<style>
a.td-none {
	text-decoration: none;
}
</style>