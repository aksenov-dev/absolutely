<template>
	<v-container class="fill-height pb-3 pb-sm-5">
		
		<!-- preview card -->
		<Preview 
			v-if="!showTest"
			:linkParams="linkParams"
			:ruLoading="ruLoading"
			:enLoading="enLoading"
			@startTest="startTest($event)"
		/>

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
					:title="i !== frames.length - 1 ? frame[direction[1] + 'Name'] : ''"
					:imgName="`${name}/${frames[i].imgName}`"
					:totalFrames="frames.length"
					:totalRight="totalRight"
					:defaultImage="defaultImage[i]"
					:buttons="buttons"
					:answer="answer"
					:clicked="clicked"
					:disable="disable"
					:finishFrame="i === frames.length - 1"
					@clickAnswer="compareAnswer($event)"
				/>
				
			</v-carousel>

			<!-- progress bar-->
			<Progress 
				:totalFrames="frames.length"
				:currentFrame="currentFrame"
			/>

		</v-card>
	</v-container>
</template>

<script>
import axios from 'axios';

import CarouselItem from "@/components/CarouselItem";
import Progress from "@/components/Progress";
import Preview from "@/components/Preview";

export default {
	name: 'test',
	metaInfo() {
		return {
			title: this.linkParams.text
		}
	},
	components: {
		CarouselItem,
		Progress,
		Preview
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
		// test visible
		showTest: false,
		// finish frame with result visible
		finishFrame: false,
		// loading icon for first type of test
		ruLoading: false,
		// loading icon for second type of test
		enLoading: false,
		// parameters for current type of test
		direction: [],
		// array for visibility image for frame
		defaultImage: [],
		// index of current frame
		currentFrame: 0,
		// array with all frames (fill from DB)
		frames: [],
		// total right answers
		totalRight: 0,
		// right answer for current frame
		answer: '',
		// clicked answer
		clicked: '',
		// disable buttons after click
		disable: false
	}),
	methods: {
		startTest(lang) {
			this.clearParams();

			lang === 'ru' 
				? this.direction.push('ru', 'en')
				: this.direction.push('en', 'ru')

			this[lang + 'Loading'] = true;
			
			// get data from DB
			axios.get('https://absolutely-d0a8f.firebaseio.com/'+ this.name + '.json')
				.then(res => {
					Object.keys(res.data).forEach(key => this.frames.push(res.data[key]));
					// sort questions randomlly
					this.frames.sort(() => Math.random() - 0.5);
					// add empty frame for show result
					this.frames.push('');
					this[lang + 'Loading'] = false;
					this.showTest = true;
				})
				.catch(error => console.log(error));
		},
		// compare clicked answer with right answer
		compareAnswer(i) {
			this.disable = true;
			// delay after answer button was clicked
			setTimeout(() => {
				this.answer = this.frames[this.currentFrame][this.direction[0] + 'Name'];
				this.clicked = this.buttons[i];
				this.defaultImage.push(true);

				this.clicked === this.answer ? this.totalRight++ : ''
			}, 500)
			// delay before next frame
			setTimeout(() => {
				this.currentFrame === this.frames.length - 2 ? this.finishFrame = true : ''

				this.currentFrame++;
				this.disable = false;
				this.answer = this.clicked = '';
			}, 1500)
		},
		// clear all params before start new test
		clearParams() {
			this.currentFrame = this.totalRight = 0;
			this.answer = this.clicked = '';
			this.frames = [];
			this.direction = [];
			this.defaultImage = [];
		}
	},
	computed: {
		// return randomly (answers + right answer) for current frame
		buttons() {
			if (!this.finishFrame) {
				const frameArray = this.frames[this.currentFrame][this.direction[0] + 'Options'];
				frameArray.sort(() => Math.random() - 0.5);
				const slicedArray = frameArray.slice(2);
				slicedArray.push(this.frames[this.currentFrame][this.direction[0] + 'Name']);
				slicedArray.sort(() => Math.random() - 0.5);

				return slicedArray;
			} else return [];
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
		}
	},
	watch: {
		'$route.params.name': function () {
			this.showTest = false;
		}
	}
}
</script>

<style>
.disable {
  pointer-events: none;
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