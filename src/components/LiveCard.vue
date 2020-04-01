<template>
  <div>
    <h1>{{title}}</h1>
    <p>{{ cuttedDescription }}</p>
    <span v-for="(speaker, i) in speakers" :key="i">{{ speaker }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    descriptionMaxLen: {
      type: Number,
      default: 50
    },
    speakers: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(s => typeof s === "string");
      }
    }
  },
  computed: {
    cuttedDescription() {
      return this.description.slice(this.descriptionMaxLen - 3) + "...";
    }
  }
};
</script>