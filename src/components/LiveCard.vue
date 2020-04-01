<template>
  <div class="my-16 p-10 border-solid border-gray-300 border-1 bg-gray-200 shadow-sm">
    <g-link :to="link">
      <h3 class="text-2xl text-teal-500 font-montserrat font-black">{{title}}</h3>
    </g-link>
    <span class="text-gray-500 text-xs mt-1 inline-block">{{date}} &bull;</span>
    <span
      class="text-teal-400 inline-block text-xs ml-1 mr-1"
      v-for="(speaker, i) in speakers"
      :key="i"
    >{{speaker}}</span>
    <p class="tracking-wide mt-4 text-gray-700 text-sm">{{ cuttedDescription }}</p>
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
      default: 150
    },
    speakers: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(s => typeof s === "string");
      }
    },
    date: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  computed: {
    cuttedDescription() {
      return (
        this.description.slice(0, this.descriptionMaxLen - 3).trim() + "..."
      );
    }
  }
};
</script>