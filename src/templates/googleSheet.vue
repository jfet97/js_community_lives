<template>
  <MainPageLayout>
    <div class="mt-24">
      <h2
        class="text-lg sm:text-xl md:text-2xl lg:text-3xl text-teal-500 font-montserrat font-black capitalize text-center"
      >{{$page.googleSheet.title}}</h2>
    </div>

    <live-video-component
      class="my-12"
      v-if="$page.googleSheet.link"
      :link="$page.googleSheet.link"
      live-video-component
    />
    <div v-else class="w-full my-20 bg-teal-700 h-64 flex justify-center items-center px-8">
      <p class="tracking-wide leading-8 text-justify text-gray-100">
        Questa live avrà luogo il {{ $page.googleSheet.date }} alle {{ formattedTime }}. Non mancare!
        <br />Entra nei gruppy della community, cliccando le icone in alto, per non perdere nessun aggiornamento  😃
      </p>
    </div>

    <p
      class="tracking-normal leading-8 text-justify text-gray-800 mb-20"
    >{{$page.googleSheet.description}}</p>
  </MainPageLayout>
</template>

<page-query>
query Post ($path: String!) {
  googleSheet (path: $path) {
    title
    description
    time
    date
    link
  }
}
</page-query>

<script>
import LiveVideoComponent from "~/components/LiveVideo.vue";
export default {
  components: {
    LiveVideoComponent
  },
  metaInfo() {
    return {
      title: this.$page.googleSheet.title,
      meta: [
        {
          name: "description",
          content: this.$page.googleSheet.description
        }
      ]
    };
  },
  computed: {
    formattedTime() {
      return this.$page.googleSheet.time
        .split(".")
        .splice(0, 2)
        .join(".");
    }
  }
};
</script>