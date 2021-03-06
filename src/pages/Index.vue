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
      <g-image class="hidden sm:block sm:w-full" src="~/assets/images/community.jpg" />
      <g-image class="sm:hidden" src="~/assets/images/community_mobile.jpg" />
    </div>
    <div class="mt-24 w-full">
      <transition-group name="fade">
        <live-card-component
          v-for="live in lives"
          :key="live.id"
          :title="live.title"
          :description="live.description"
          :speakers="live.speakers"
          :date="live.date"
          :link="`/lives/${live.id}`"
        />
      </transition-group>

      <ClientOnly>
        <infinite-loading @infinite="infiniteHandler" spinner="spiral">
          <div slot="no-more">
            <span class="text-gray-800 mb-12 block">Altre live presto in arrivo!</span>
          </div>
          <!-- <div slot="no-results"></div> -->
        </infinite-loading>
      </ClientOnly>
    </div>
  </MainPageLayout>
</template>

<page-query>
  query($page: Int) {
    allGoogleSheet(perPage: 3, page: $page, sortBy: "order", order: DESC) @paginate {
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
      // return this.loadedLives.sort((l1, l2) => {
      //   const l1D = new Date(
      //     parseInt(l1.date.split("/")[2], 10),
      //     parseInt(l1.date.split("/")[1], 10) - 1,
      //     parseInt(l1.date.split("/")[0], 10)
      //   );

      //   const l2D = new Date(
      //     parseInt(l2.date.split("/")[2], 10),
      //     parseInt(l2.date.split("/")[1], 10) - 1,
      //     parseInt(l2.date.split("/")[0], 10)
      //   );

      //   console.log(l1D);

      //   return l2D - l1D;
      // });

      return this.loadedLives;
    }
  },
  created() {
    this.loadedLives.push(...transformLives(this.$page.allGoogleSheet.edges));
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
.fade-enter-active,
.fade-leave-active {
  transition: ease opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
