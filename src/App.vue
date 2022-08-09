<template>
  <div class="trading-app-main">
    <Transition name="fade">
      <IntroPage @click="switchToInputPage()" v-if="isShowingIntroPage"></IntroPage>
    </Transition>
    <Transition name="fade">
      <InputPage v-if="isShowingInputPage" :switchToInfoPage="switchToInfoPage"></InputPage>
    </Transition>
    <Transition name="fade">
      <InfoPage v-if="isShowingInfoPage" :switchToTradingPage="switchToTradingPage"></InfoPage>
    </Transition>
    <Transition name="fade">
      <TradingPage v-if="isShowingTradingPage" :switchToEndPage="switchToEndPage"></TradingPage>
    </Transition>
    <Transition name="fade">
      <EndPage v-if="isShowingEndPage"></EndPage>
    </Transition>
  </div>
</template>

<script>

  import EndPage from './components/StaticPages/EndPage.vue'
  import IntroPage from './components/StaticPages/IntroPage.vue'
  import InfoPage from './components/StaticPages/InfoPage.vue'
  import TradingPage from './components/TradingPage/TradingPage.vue'
  import InputPage from './components/StaticPages/InputPage.vue'

  export default {
    name: 'App',
    components: {
      EndPage,
      IntroPage,
      InfoPage,
      TradingPage,
      InputPage,
    },
    data() {
      return {
        isShowingIntroPage: true,
        isShowingInputPage: false,
        isShowingInfoPage: false,
        isShowingTradingPage: false,
        isShowingEndPage: false,
      }
    },
    methods: {
      switchToInputPage() {
        this.isShowingIntroPage = false;
        setTimeout(() => {
          this.isShowingInputPage = true;  
        }, 1000)
      },
      switchToInfoPage() {
        this.isShowingInputPage = false;
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
