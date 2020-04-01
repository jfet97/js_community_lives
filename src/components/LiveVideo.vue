<template>
  <div>
    <div class="rwd-video">
      <iframe :src="link" height="315" width="560" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.rwd-video {
  height: 0;
  overflow: hidden;
  padding-bottom: 56.25%;
  padding-top: 30px;
  position: relative;
}
.rwd-video iframe,
.rwd-video object,
.rwd-video embed {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>