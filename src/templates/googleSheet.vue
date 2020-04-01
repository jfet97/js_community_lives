<template>
  <layout>
    <div>{{$page.googleSheet.title}}</div>
    <div>{{$page.googleSheet.description}}</div>
  </layout>
</template>

<page-query>
query Post ($path: String!) {
  googleSheet (path: $path) {
    title
    description
  }
}
</page-query>