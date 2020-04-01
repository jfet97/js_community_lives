<template>
  <div>
    <header>
      <div class="w-screen flex justify-center">
        <h1
          class="text-4xl text-teal-500 font-montserrat font-black mt-6 upper"
        >JavaScript Italia Community Lives</h1>
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
