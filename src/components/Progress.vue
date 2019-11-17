<template>
	<v-row class="px-4">
		<v-col cols="12" class="py-4 py-sm-5">
			<v-progress-linear
				background-color="secondary"
				color="indigo lighten-4"
				height="20"
				class="rounded"
				:value="`${100 / (totalFrames - 1) * currentFrame}`"
			>
				<strong class="caption">{{ currentFrame }} / {{ totalFrames - 1 }}</strong>
			</v-progress-linear>
		</v-col>
	</v-row>
</template>

<script>
export default {
	props: {
		totalFrames: {
			type: Number,
			required: true
		},
		currentFrame: {
			type: Number,
			required: true
		},
	}
}
</script>

<style>
.rounded {
	border-radius: 28px;
}
</style>