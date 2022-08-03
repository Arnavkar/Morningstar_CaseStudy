<template>
  <div class="trading-app-main">
    <Transition name="fade">
      <IntroPage @click="switchToInfoPage()" v-if="isShowingIntroPage"></IntroPage>
    </Transition>
    <Transition name="fade">
      <InfoPage v-if="isShowingInfoPage" :switchToTradingPage="switchToTradingPage"></InfoPage>
    </Transition>
    <Transition name="fade">
      <TradingPage v-if="isShowingTradingPage" :switchToEndPage="switchToEndPage"></TradingPage>
    </Transition>
    <Transition name="fadee">
      <EndPage v-if="isShowingEndPage"></EndPage>
    </Transition>
  </div>
</template>

<script>

  import IntroPage from './components/StaticPages/IntroPage.vue'
  import InfoPage from './components/StaticPages/InfoPage.vue'
  import TradingPage from './components/TradingPage/TradingPage.vue'
  import EndPage from './components/StaticPages/EndPage.vue'

  export default {
    name: 'App',
    components: {
    IntroPage,
    InfoPage,
    TradingPage,
    EndPage,
},
    data() {
      return {
        isShowingIntroPage: true,
        isShowingInfoPage: false,
        isShowingTradingPage: false,
        isShowingEndPage: false
      }
    },
    methods: {
      switchToInfoPage() {
        this.isShowingIntroPage = false;
        setTimeout(() => {
          this.isShowingInfoPage = true;  
        }, 1000)
      },
      switchToTradingPage() {
        this.isShowingInfoPage = false;
        setTimeout(() => {
          this.isShowingTradingPage = true;
        }, 2000)
      },
      switchToEndPage() {
        this.isShowingTradingPage = false;
        setTimeout(() => {
          this.isShowingEndPage = true;
        }, 2000)
      },
    }
  }

</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

    .trading-app-main {
      margin-top: 100px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fadee-enter-active,
    .fadee-leave-active {
        transition: opacity 1.5s;
    }

    .fadee-enter-from,
    .fadee-leave-to {
        opacity: 0;
    }
</style>
