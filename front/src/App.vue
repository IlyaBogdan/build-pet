<template>
  <FooterElement />

  <router-view></router-view>

  <HeaderElement />
</template>

<script>
  import HeaderElement from "./components/common/Header";
  import FooterElement from "./components/common/Footer";

  export default {
    components: { HeaderElement, FooterElement }
  }
</script>

<style>
  
</style>
