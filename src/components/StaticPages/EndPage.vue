<template>
    <div class="end-page-main">
        <h1 class="header-one">Thank you for completing the Morningstar Overconfidence Trading Simulation!</h1>
        <Transition name="fade">
            <h1 class="header-two" v-if="isShowingSubHeader">Here is your score:</h1>
        </Transition>

        <Transition name="fade">
            <h1 class="header-one" v-if="isShowingSubHeader">SCORE WITH RATING METER BELOW</h1>
        </Transition>

        <Transition name="fade">
            <h1 class="header-two" v-if="showMetric_1">Based on your trade history, We saw that you made 6 trades with a value that was more than 40% of your uninvested money at the time. See more</h1>
        </Transition>

        <Transition name="fade">
            <h1 class="header-two" v-if="showMetric_2">You read a total of 20 articles</h1>
        </Transition>

        <Transition name="fade">
            <h1 class="header-two" v-if="showMetric_3">You decided to subscribe to Morningstar's premium advice, enhancing the quality of the information you received</h1>
        </Transition>

        <Transition name="fade">
            <h1 class="header-two" v-if="showMetric_4">You frequently made trades in the game's pause state, which tells us that you took time to think about each trade</h1>
        </Transition>

        <Transition name="fade">
            <h1 class="header-two" v-if="showMetric_5">Your portfolio was well balanced throughout the simulation, here are snapshots of your portfolio</h1>
        </Transition>
    </div>
</template>

<script>

    export default {
        name: 'EndPage',
        data() {
            return {
                isShowingSubHeader: false,
                isShowingScore: false,
                showMetric_1: false,
                showMetric_2: false,
                showMetric_3: false,
                showMetric_4: false,
                showMetric_5: false,
                showPortfolioSnapshots: false,
            }
        },
        mounted() {
            setTimeout(() => {
                this.isShowingSubHeader = true;
            }, 2000)
            setTimeout(() => {
                this.isShowingScore = true;
            }, 3000)
            setTimeout(() => {
                this.showMetric_1 = true;
            }, 4000)
            setTimeout(() => {
                this.showMetric_2 = true;
            }, 5000)
            setTimeout(() => {
                this.showMetric_3 = true;
            }, 6000)
            setTimeout(() => {
                this.showMetric_4 = true;
            }, 7000)
            setTimeout(() => {
                this.showMetric_5 = true;
            }, 9000)
            setTimeout(() => {
                this.showPortfolioSnapshots = true;
            }, 9500)
        },
    }

</script>

<style scoped lang="scss">

    @import '@mds/fonts';
    @import '@mds/constants';
    @import '@mds/utils-scss';
    @import '@mds/typography';

    .end-page-main {
        margin-top: 100px;
    }

    .header-one {
        @include mds-level-1-heading($bold: false);
        margin-top: 100px;
    }

    .header-two {
        @include mds-level-1-heading($bold: false);
        margin-bottom: 50px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 2s;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

</style>