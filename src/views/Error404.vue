<template>
	<v-container class="fill-height pb-5" >
		<v-card 
			:elevation="$vuetify.breakpoint.xsOnly ? 8 : 24" 
			:width="$vuetify.breakpoint.xsOnly ? 320 : 600" 
			class="mx-auto"
		>			
			<v-row align="center" class="mx-0 red lighten-1">
				<v-col class="my-4 my-sm-10">
					<v-sheet 
						:width="roundSize"
						:height="roundSize"
						color="white" 
						class="mx-auto pt-1 round shadow"
					>
						<v-sheet 
							:width="roundSize - 8"
							:height="roundSize - 8"
							class="d-flex ml-1 round secondary"
						>
							<v-icon class="mx-auto no-transition red--text text--lighten-1" size="108">
								mdi-emoticon-sad
							</v-icon>
						</v-sheet>
						
					</v-sheet>
				</v-col>
			</v-row>

			<v-card-text class="text-center title accent--text pb-0 pb-sm-4">
					Ошибка 404
			</v-card-text>

			<v-card-actions class="pt-2 pt-sm-1">
				<v-row class="px-3">
					<v-col cols="12" sm="6" class="py-2 py-sm-3 mx-auto">
						<v-btn 
							class="white--text px-4 red lighten-1"
							depressed
							rounded
							block
							to="/"
						>
							На главную
						</v-btn>
					</v-col>
				</v-row>
			</v-card-actions>

		</v-card>
	</v-container>
</template>

<script>
export default {
	metaInfo: {
		title: 'Страница не найдена'
	},
	computed: {
		roundSize() {
			let size;

			switch (this.$vuetify.breakpoint.name) {
				case 'xs':
					size = '128'
					break
				case 'sm': case 'md': case 'lg': case 'xl':
					size = '198'
					break
			}

			return size
		}
	}
};
</script>