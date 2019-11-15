<template>
  <v-app>

		<!-- navbar -->
    <Navbar :links="links" />

		<v-content class="secondary px-4 pb-4">
			<!-- renders the matched component for the given path -->
      <router-view :links="links"></router-view>
    </v-content>

		<!-- footer -->
    <v-footer padless class="secondary">
      <v-col class="caption accent--text px-md-8 px-4" cols="12">
        © {{ new Date().getFullYear() }}, Тест на знание иностранных слов 
				<strong>«Absolutely»</strong>
      </v-col>
    </v-footer>

  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: 'App',
  components: {
		Navbar
  },
  data: () => ({
    links: [
			{
				icon: "mdi-flower-tulip", 
				color: 'green lighten-1',
				textColor: 'green--text text--lighten-1',
				text: "Природа", 
				route: "/nature" 
			},
			{
				icon: "mdi-cat",
				color: 'indigo lighten-1', 
				textColor: 'indigo--text indigo--lighten-1',
				text: "Животные", 
				route: "/animals"
			},
			{
				icon: "mdi-food-apple", 
				color: 'orange lighten-1', 
				textColor: 'orange--text orange--lighten-1',
				text: "Еда", 
				route: "/food"
			},
			{
				icon: "mdi-tshirt-crew", 
				color: 'pink lighten-1', 
				textColor: 'pink--text pink--lighten-1',
				text: "Одежда", 
				route: "/clothes"
			}
		]
  })
};
</script>
