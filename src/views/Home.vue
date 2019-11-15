<template>
	<v-container class="fill-height pb-5" >
		<v-row class="my-4 mx-auto" style="max-width:854px">
			<v-col cols="12" sm="6" v-for="(link, i) in links" :key="i">
				
				<!-- card -->
				<v-hover>
					<template v-slot="{ hover }">
						<v-card class="mx-auto" width="100%" :elevation="hover ? 12 : 4">
							
							<!-- image link -->
							<router-link :to="link.route" class="td-none">
								<v-row align="center" style="height:200px" class="mx-0" :class="link.color">
									<v-col>

										<!-- background for icon -->
										<v-sheet 
											color="white" 
											height="128"
											width="128"
											class="mx-auto pt-1 round shadow"
										>
											<v-sheet 
												height="120" 
												width="120" 
												class="d-flex round secondary ml-1"
											>

												<!-- card icon -->
												<v-icon class="mx-auto" :class="link.textColor" size="108">
													{{ link.icon }}
												</v-icon>

											</v-sheet>
										</v-sheet>
									</v-col>
								</v-row>
							</router-link>

							<!-- text link -->
							<v-card-actions>
								<v-btn text :to="link.route" class="primary--text hover-none">
									{{ link.text }}
								</v-btn>
							</v-card-actions>

						</v-card>
					</template>
				</v-hover>

			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'home',
	metaInfo: {
		title: 'Абсолютли'
	},
  props: {
		links: {
			type: Array,
			required: true
		}
	}
};
</script>

<style>
a.td-none {
	text-decoration: none;
}
.hover-none:hover:before, .hover-none:focus:before {
	display: none;
}
.round {
	border-radius: 50%;
}
</style>
