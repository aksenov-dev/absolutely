<template>
  <v-app>

		<!-- navbar -->
    <Navbar :links="links" />

		<v-content class="secondary px-4 pb-4">
			<!-- renders the matched component for the given path -->
      <router-view></router-view>
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
				text: "Природа",
				route: "/nature" 
			},
			{
				icon: "mdi-cat",
				text: "Животные",
				route: "/animals"
			},
			{
				icon: "mdi-food-apple",
				text: "Еда", 
				route: "/food"
			},
			{
				icon: "mdi-tshirt-crew",
				text: "Одежда", 
				route: "/clothes"
			}
		]
  })
};
</script>
