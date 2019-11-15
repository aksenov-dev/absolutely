<template>
  <v-app>
    <Navbar :links="links" />
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
