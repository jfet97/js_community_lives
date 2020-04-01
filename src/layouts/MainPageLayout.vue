<template>
  <div>
    <header>
      <div class="w-screen flex justify-center">
        <div class="flex flex-col">
          <h1
            class="text-4xl text-teal-500 font-montserrat font-black mt-6 upper"
          >JavaScript Italia Community Lives</h1>
          <div>Icons</div>
        </div>
      </div>
    </header>
    <slot />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>


<style>
</style>
