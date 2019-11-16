<template>
	<v-carousel-item>

		<v-row justify="center">
			<v-col class="pt-4 pt-sm-9">

				<!-- background for image -->
				<v-sheet 
					color="white" 
					:height="roundSize" 
					:width="roundSize" 
					class="mx-auto pt-1 round shadow"
				>

					<!-- image for carousel-item -->
					<v-avatar 
						:height="roundSize - 8" 
						:width="roundSize - 8"
						class="ml-1"
					>
						<img 
							v-show="!defaultImage" 
							src="@/assets/question.png" 
							alt="Question"
						>
						<img 
							v-show="defaultImage" 
							:src="'/img/' + imgName" 
							alt="Answer"
						>
					</v-avatar>
					
				</v-sheet>
			</v-col>
		</v-row>

		<!-- title for carousel-item -->
		<v-card-title class="justify-center py-2 py-sm-4">
			{{ title }}
		</v-card-title>
	
		<!-- buttons for carousel-item -->
		<v-card-actions>
			<v-row class="px-3">
				<v-col 
					cols="12" 
					sm="6" 
					class="pa-2 pt-1 pt-sm-2 mx-auto" 
					v-for="(btn, k) in buttons" 
					:key="k"
				>
					<v-btn 
						depressed 
						rounded
						block
						:class="{
							'secondary accent--text': (btn !== answer && btn !== clicked),
							'error white--text': btn === clicked,
							'success white--text': btn === answer,
							'disable': disable
						}"
						@click="clickAnswer(k)"
					>
						{{ btn }}
					</v-btn>
				</v-col>
			</v-row>
		</v-card-actions>

	</v-carousel-item>
</template>

<script>
export default {
props: {
	title: {
		type: String,
		required: true
	},
	imgName: {
		type: String,
		required: true
	},
	defaultImage: {
		type: Boolean,
		default: false
	},
	buttons: {
		type: Array,
		required: true
	},
	answer: {
		type: String,
		required: true
	},
	clicked: {
		type: String,
		required: true
	},
	disable: {
		type: Boolean,
		required: true
	}
},
methods: {
	clickAnswer(k) {
		this.$emit('clickAnswer', k);
	}
},
computed: {
		// return size for frame background
		roundSize() {
			let size;

			switch (this.$vuetify.breakpoint.name) {
				case 'xs':
					size = '138';
					break;
				case 'sm': case 'md': case 'lg': case 'xl':
					size = '258';
					break;
			}

			return size;
		}
	}
}
</script>

<style>

</style>