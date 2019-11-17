<template>
	<v-card 
		:elevation="$vuetify.breakpoint.xsOnly ? 8 : 24" 
		:width="$vuetify.breakpoint.xsOnly ? 320 : 600" 
		class="mx-auto"
	>			
		<v-row align="center" class="mx-0" :class="linkParams.color">
			<v-col class="my-4 my-sm-10">

				<!-- background for icon -->
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

						<!-- preview card icon -->
						<v-icon class="mx-auto no-transition" :class="linkParams.textColor" size="108">
							{{ linkParams.icon }}
						</v-icon>
					</v-sheet>
				</v-sheet>
			</v-col>
		</v-row>

		<!-- preview card description -->
		<v-card-text class="body-1 accent--text pb-0 pb-sm-4">
			<p 
				class="mb-0" 
				:class="{
					'body-2': $vuetify.breakpoint.xsOnly, 
					'body-1': $vuetify.breakpoint.smAndUp
				}"
			>
				Предлагаем вам пройти тест на знание английских слов.
			</p>
			<p 
				class="mb-0" 
				:class="{
					'body-2': $vuetify.breakpoint.xsOnly, 
					'body-1': $vuetify.breakpoint.smAndUp
				}"
			>
				Тест состоит из 20 вопросов на тему <strong>«{{ linkParams.text }}»</strong>.
			</p>
			<p class="mb-0 d-none d-sm-block">
				В режиме <strong>«слово-перевод»</strong> вам будет предложено выбрать 
				правильный перевод английского слова на русский.<br>
			</p>
			<p class="mb-0 d-none d-sm-block">
				В режиме <strong>«перевод-слово»</strong> нужно будет выбрать правильный 
				английский перевод для русского слова.
			</p>
		</v-card-text>

		<!-- preview card buttons -->
		<v-card-actions class="pt-2 pt-sm-1">
			<v-row class="px-3">
				<v-col class="pb-1 py-sm-3">
					<v-btn 
						class="white--text px-4"
						:class="linkParams.color"
						depressed
						rounded
						block
						:loading="ruLoading"
						@click="startTest('ru')"
					>Слово — Перевод</v-btn>
				</v-col>
				<v-col class="py-2 py-sm-3">
					<v-btn 
						class="white--text px-4"
						:class="linkParams.color"
						depressed
						rounded
						block
						:loading="enLoading"
						@click="startTest('en')"
					>Перевод — Слово</v-btn>
				</v-col>
			</v-row>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: {
		linkParams: {
			type: Object,
			required:true
		},
		ruLoading: {
			type: Boolean,
			required:true
		},
		enLoading: {
			type: Boolean,
			required:true
		}
	},
	methods: {
		// create event for start test
		startTest(lang) {
			this.$emit('startTest', lang);
		}
	},
	computed: {
		// return size for card background
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
}
</script>