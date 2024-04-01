<template>
  <InlineSvg v-if="src.includes('.svg')" :src="src" @error="onError"></InlineSvg>
  <img v-else :src="src" :alt="alt" @error="onError" />
</template>

<script setup>
import InlineSvg from 'vue-inline-svg'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },

  alt: {
    type: String,
  },

  alternativeSrc: {
    type: String,
  },
})

function onError(e) {
  if (props.alternativeSrc) {
    e.target.src = props.alternativeSrc
  }
}
</script>