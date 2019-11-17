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
						v-if="!finishFrame"
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

					<!-- total right answers for finish frame -->
					<v-sheet 
						v-else
						:height="roundSize - 8" 
						:width="roundSize - 8" 
						class="round secondary ml-1"
					>
						<v-row style="height:100%" align="center">
							<v-col class="text-center accent--text">
								<p 
									class="mb-0 mb-sm-3"
									:class="{
										'body-2': $vuetify.breakpoint.xsOnly, 
										'body-1': $vuetify.breakpoint.smAndUp
									}"
								>
									Количество<br>правильных ответов
								</p>
								<p 
									class="font-weight-medium mb-0"
									:class="{
										'display-1': $vuetify.breakpoint.xsOnly, 
										'display-3': $vuetify.breakpoint.smAndUp
									}"
								>
									{{ `${totalRight}/${totalFrames - 1}` }}
								</p>
							</v-col>
						</v-row>
					</v-sheet>
					
				</v-sheet>
			</v-col>
		</v-row>

		<!-- title for carousel-item -->
		<v-card-title v-if="!finishFrame" class="justify-center py-2 py-sm-4">
			{{ title }}
		</v-card-title>

		<!-- title for test result frame -->
		<v-card-title v-else class="justify-center pb-2">
			<div v-if="totalRight === totalFrames - 1">Отлично!</div>
			<div v-else-if="totalRight >= Math.round((totalFrames - 1) * 0.7)">
				Неплохо!
			</div>
			<div v-else>Так себе</div>
		</v-card-title>
	
		<!-- buttons for carousel-item -->
		<v-card-actions v-if="!finishFrame">
			<v-row class="px-3">
				<v-col 
					cols="12" 
					sm="6" 
					class="pa-2 pt-1 pt-sm-2 mx-auto" 
					v-for="(btn, i) in buttons" 
					:key="i"
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
						@click="clickAnswer(i)"
					>
						{{ btn }}
					</v-btn>
				</v-col>
			</v-row>
		</v-card-actions>

		<!-- text for test result frame -->
		<div v-else>
			<v-row class="mx-0">
				<v-col cols="12" sm="7"
					class="mx-auto text-center py-sm-0 px-3"
					:class="{
						'body-2': $vuetify.breakpoint.xsOnly, 
						'body-1': $vuetify.breakpoint.smAndUp
					}"
				>
					<p v-if="totalRight === totalFrames - 1">
						У тебя прекрасный результат!<br>
						Похоже, ты знаешь все слова.<br> 
						А что если попробовать другую тему?
					</p>
					<p v-else-if="totalRight >= Math.round((totalFrames - 1) * 0.7)">
						Это хороший результат,<br>
						но мы знаем, что ты можешь лучше!<br>
						Может в другой теме повезет больше?
					</p>
					<p v-else>
						Сегодня явно не твой день.<br>
						Но не стоит отчаиваться, попробуй<br>
						еще раз или выбери другую тему.
					</p>
					<v-btn class="mt-1 primary white--text" width="60%" depressed rounded to="/">
						На главную
					</v-btn>
				</v-col>
			</v-row>
		</div>

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
		totalFrames: {
			type: Number,
			required: true
		},
		totalRight: {
			type: Number,
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
		},
		finishFrame: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		// create event with index of clicked answer button
		clickAnswer(i) {
			this.$emit('clickAnswer', i);
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