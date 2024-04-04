<template>
  <FooterElement />

  <ChatElement />

  <HeaderElement />
</template>

<script>
  import ChatElement from "./components/chat/Chat";
  import HeaderElement from "./components/common/Header";
  import FooterElement from "./components/common/Footer";

  export default {
    components: { HeaderElement, FooterElement, ChatElement }
  }
</script>

<style>
  
</style>
