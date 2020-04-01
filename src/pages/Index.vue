<template>
  <MainPageLayout>
    <div class="mt-24">
      <p class="tracking-wide leading-8 text-justify">
        La
        <b>community</b> JavaScript Developer Italiani, capitanata da
        <a
          href="https://site.fabiobiondi.io/"
          target="_blank"
        >
          <span class="text-teal-500 font-bold">Fabio Biondi</span>
        </a>, è lieta di portarvi validi contenuti
        <b>gratuiti</b> sottoforma di live, nelle quali vengono trattati i temi più caldi del momento: JavaScript, TypeScript, React, Angular, RxJS e molto altro!
      </p>
    </div>
    <div class="mt-16 w-full">
      <g-image src="~/assets/images/community.jpg" height="700" fit="cover" />
    </div>
    <div class="mt-24 w-full">
      <live-card-component
        v-for="live in lives"
        :key="live.id"
        :title="live.title"
        :description="live.description"
        :speakers="live.speakers"
      />
    </div>
  </MainPageLayout>
</template>

<page-query>
  query {
    allGoogleSheet(sortBy: "date", order: DESC) {
      edges {
        node {
          id
          title
          description
          speakers
        }
      }
    }
  }
</page-query>

<script>
import LiveCardComponent from "~/components/LiveCard.vue";

export default {
  metaInfo: {
    title: "JavaScript ITA Lives",
    charset: "utf-8",
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  },
  computed: {
    lives() {
      // [{ id, description, title, speakers }]
      return this.$page.allGoogleSheet.edges
        .map(edge => edge.node)
        .map(live => ({
          ...live,
          speakers: live.speakers.replace(/\n/g, "").split(",")
        }));
    }
  },
  components: {
    LiveCardComponent
  }
};
</script>

<style>
</style>
