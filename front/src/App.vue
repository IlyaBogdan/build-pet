<template>
  <NavBar />

  <div class="content">
    <HeaderElement />
    <router-view></router-view>

    <FooterElement />
  </div>
  
</template>

<script>
  import HeaderElement from "./components/common/Header";
  import FooterElement from "./components/common/Footer";
  import NavBar from "./components/common/NavBar";

  export default {
    components: { HeaderElement, FooterElement, NavBar }
  }
</script>

<style>
  #app {
    display: flex;
    .content {
      width: 100%;
    }
  }
</style>
