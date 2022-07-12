<template>
  <div>
    <TradingPage></TradingPage>
  </div>
</template>

<script>

  import TradingPage from './components/TradingPage/TradingPage.vue'

  export default {
    name: 'App',
    components: {
      TradingPage
    }
  }

</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
