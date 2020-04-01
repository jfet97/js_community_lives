<template>
  <div>
    <header>
      <div class="w-full flex justify-center">
        <div class="flex flex-col">
          <h1
            class="text-4xl text-teal-500 font-montserrat font-black mt-12 capitalize"
          >JavaScript developer italiani - Lives</h1>
          <div class="flex justify-center mt-4">
            <a
              href="https://www.facebook.com/groups/javascript.developer.italiani/"
              target="_blank"
            >
              <JavaScriptIcon
                class="fill-current text-teal-900 hover:text-yellow-500 inline-block h-6 w-6 mr-2 transition duration-500 ease-in-out"
              />
            </a>
            <a href="https://www.facebook.com/groups/angularjs.developer.italiani/" target="_blank">
              <AngularIcon
                class="fill-current text-teal-900 hover:text-red-500 inline-block h-6 w-6 mx-2 transition duration-500 ease-in-out"
              />
            </a>
            <a href="https://www.facebook.com/groups/react.developer.italiani/" target="_blank">
              <ReactIcon
                class="fill-current text-teal-900 hover:text-blue-500 inline-block h-6 w-6 mx-2 transition duration-500 ease-in-out"
              />
            </a>
            <a
              href="https://www.facebook.com/groups/opportunita.developer.italiani/"
              target="_blank"
            >
              <OPDIIcon
                class="fill-current text-teal-900 hover:text-gray-500 inline-block h-6 w-6 ml-2 transition duration-500 ease-in-out"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
    <div class="w-full flex justify-center">
      <div class="w-1/2 flex flex-col">
        <slot />
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import JavaScriptIcon from "~/assets/svgs/javascript.svg";
import AngularIcon from "~/assets/svgs/angular.svg";
import ReactIcon from "~/assets/svgs/react.svg";
import OPDIIcon from "~/assets/svgs/buddy.svg";

export default {
  components: {
    JavaScriptIcon,
    AngularIcon,
    ReactIcon,
    OPDIIcon
  }
};
</script>



<style>
</style>
