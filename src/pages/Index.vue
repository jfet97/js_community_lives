<template>
  <MainPageLayout>
    <div class="mt-24">
      <p class="tracking-wide leading-8 text-justify text-gray-800">
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
      <g-image src="~/assets/images/community.jpg" height="750" fit="cover" />
    </div>
    <div class="mt-24 w-full">
      <live-card-component
        v-for="live in loadedLives"
        :key="live.id"
        :title="live.title"
        :description="live.description"
        :speakers="live.speakers"
        :date="live.date"
      />

      <ClientOnly>
        <infinite-loading @infinite="infiniteHandler" spinner="spiral">
          <div slot="no-more">
            <span class="text-gray-800">Altre lives presto in arrivo!</span>
          </div>
          <!-- <div slot="no-results"></div> -->
        </infinite-loading>
      </ClientOnly>
    </div>
  </MainPageLayout>
</template>

<page-query>
  query($page: Int) {
    allGoogleSheet(sortBy: "date", order: DESC, perPage: 2, page: $page) @paginate {
      pageInfo {
			  totalPages
        currentPage
		  }
      edges {
        node {
          id
          title
          description
          speakers
          date
        }
      }
    }
  }
</page-query>

<script>
import LiveCardComponent from "~/components/LiveCard.vue";

// [{ id: String, description: String, title: String, speakers: [String] }]
function transformLives(rawLivesArray) {
  return rawLivesArray
    .map(edge => edge.node)
    .map(live => ({
      ...live,
      speakers: live.speakers.replace(/\n/g, "").split(",")
    }));
}

export default {
  components: {
    LiveCardComponent
  },
  metaInfo: {
    title: "JavaScript ITA Lives",
    charset: "utf-8",
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  },
  data() {
    return {
      loadedLives: [],
      currentPage: 1
    };
  },
  computed: {
    lives() {
      return transformLives(this.$page.allGoogleSheet.edges);
    }
  },
  created() {
    this.loadedLives.push(...this.lives);
  },
  methods: {
    async infiniteHandler($state) {
      if (
        this.currentPage + 1 >
        this.$page.allGoogleSheet.pageInfo.totalPages
      ) {
        $state.complete();
      } else {
        const { data } = await this.$fetch(`/${this.currentPage + 1}`);
        if (data.allGoogleSheet.edges.length) {
          this.currentPage = data.allGoogleSheet.pageInfo.currentPage;
          this.loadedLives.push(
            ...transformLives([...data.allGoogleSheet.edges])
          );
          $state.loaded();
        } else {
          $state.complete();
        }
      }
    }
  }
};
</script>

<style>
</style>
