<template>
	<v-container class="fill-height pb-3 pb-sm-5">
		
		<!-- preview card -->
		<v-card 
			v-if="!showTest" 
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
							@click="startTest"
						>Слово — Перевод</v-btn>
					</v-col>
					<v-col class="py-2 py-sm-3">
						<v-btn 
							class="white--text px-4"
							:class="linkParams.color"
							depressed
							rounded
							block
						>Перевод — Слово</v-btn>
					</v-col>
				</v-row>
			</v-card-actions>
		</v-card>

		<!-- carousel card -->
		<v-card 
			v-if="showTest" 
			:elevation="$vuetify.breakpoint.xsOnly ? 8 : 24" 
			:width="$vuetify.breakpoint.xsOnly ? 320 : 600" 
			class="mx-auto"
		>
			<v-carousel
				:continuous="false"
				:show-arrows="false"
				hide-delimiters
				height="100%"
				v-model="currentFrame"
			>

				<!-- carousel element -->
				<CarouselItem 
					v-for="(frame, i) in frames"
					:key="i"
					:title="frame.ruName"
					:buttons="buttons"
					@clickAnswer="compareAnswer($event)"
				/>
				
			</v-carousel>

			<!-- progress bar-->
			<v-row class="px-4">
					<v-col cols="12" class="py-4 py-sm-5">
						<v-progress-linear
							background-color="secondary"
							color="indigo lighten-4"
							height="20"
							class="rounded"
							:value="`${100 / (frames.length - 1) * currentFrame}`"
						>
							<strong class="caption">{{ currentFrame }} / {{ frames.length }}</strong>
						</v-progress-linear>
					</v-col>
				</v-row>
		</v-card>

	</v-container>
</template>

<script>
import axios from 'axios';
import CarouselItem from "@/components/CarouselItem";

export default {
	name: 'test',
	components: {
		CarouselItem
	},
	props: {
		links: {
			type: Array,
			required: true
		},
		name: {
			type: String,
			required: true
		}
	},
	data: () => ({
		showTest: false,
		currentFrame: 0,
		frames: []
	}),
	methods: {
		startTest() {
			axios.get('https://absolutely-d0a8f.firebaseio.com/'+ this.name + '.json')
				.then(res => {
					Object.keys(res.data).forEach(key => this.frames.push(res.data[key]));
					this.frames.sort(() => Math.random() - 0.5);
					this.showTest = true;
				})
				.catch(error => console.log(error));
		},
		compareAnswer(i) {
			console.log(i);
			this.currentFrame++;
		}
	},
	computed: {
		// return mixed randomly (answers + right answer) for current frame
		buttons() {
				const frameArray = this.frames[this.currentFrame]['enOptions'];
				frameArray.sort(() => Math.random() - 0.5);
				const slicedArray = frameArray.slice(2);
				slicedArray.push(this.frames[this.currentFrame]['enName']);
				slicedArray.sort(() => Math.random() - 0.5);

				return slicedArray;
		},
		// find and return params for current route
		linkParams() {
			const params = {};

			this.links.forEach(item => {
				if (item.route.indexOf(this.name) !== -1) {
					params.icon = item.icon;
					params.text = item.text;
					params.color = item.color;
					params.textColor = item.textColor;
				}
			})

			return params;
		},
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

<style>
.rounded {
	border-radius: 28px;
}
.round {
	border-radius: 50%;
}
.shadow {
  box-shadow: 0px 25px 35px 0px rgba(0, 0, 0, 0.2);
}
.no-transition {
	transition: none !important;
}
</style>