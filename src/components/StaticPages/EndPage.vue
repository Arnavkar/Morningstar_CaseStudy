<template>
    <div class="end-page-main">
        <h1 class="header-one">Time's Up! Thank you for completing the Morningstar Overconfidence Trading Simulation!</h1>
        <Transition name="fade">
            <h1 class="score" v-if="isShowingSubHeader">Here is your score:</h1>
        </Transition>
        <Transition name="fade">
            <div v-if="isShowingScore" class="meter-wrapper">
                <div class="percentage">{{calculateOverConfidencePercentage()}}</div>
                <circle-progress :fill-color="'#ff0000'" :percent="calculateOverConfidencePercentage()" :size="300" :transition="200"/>
            </div>
        </Transition>
        <Transition name="fade">
            <h2 v-if="showVerbage" class="">
                Your overconfidence level is: <b>average</b>
            </h2>
        </Transition>
        <Transition name="fade">
            <h2 v-if="showMetric_1">Based on your trade history, We saw that you made <b>6</b> trades with a value that was more than 40% of your uninvested money at the time.</h2>
        </Transition>
        <Transition name="fade">
            <h2 v-if="showMetric_2">Your portfolio was <b>well balanced</b> throughout the simulation. Here's how your portfolio progressed:</h2>
        </Transition>
        <div class="card-container" v-if="showMetric_2">
            <div class="card">
                <Transition name="fade">
                    <div v-if="showChart1" class="card-cover nice-boxshadow">
                        <h2 class="card-header">Day 40</h2>
                        <PieChart :holdingsData="[0, 0, 0, 0, 1000, 6000]" :key="1"></PieChart> 
                    </div>
                </Transition>
            </div>

            <div class="card">
                <Transition name="fade">
                    <div v-if="showChart2" class="card-cover nice-boxshadow">
                        <h2 class="card-header">Day 60</h2>
                        <PieChart :holdingsData="[0, 0, 2000, 0, 1000, 6000]" :key="2"></PieChart> 
                    </div>
                </Transition>
            </div>

            <div class="card">
                <Transition name="fade">
                    <div v-if="showChart3" class="card-cover nice-boxshadow">
                        <h2 class="card-header">Day 80</h2>
                        <PieChart :holdingsData="[0, 0, 500, 0, 1000, 6000]" :key="3"></PieChart> 
                    </div>
                </Transition>
            </div>

            <div class="card">
                <Transition name="fade">
                    <div v-if="showChart4" class="card-cover nice-boxshadow">
                        <h2 class="card-header">Day 100</h2>
                        <PieChart :holdingsData="[300, 0, 1000, 500, 1000, 6000]" :key="4"></PieChart> 
                    </div>
                </Transition>
            </div>

            <div class="card">
                <Transition name="fade">
                    <div v-if="showChart5" class="card-cover nice-boxshadow">
                        <h2 class="card-header">Day 120 - End</h2>
                        <PieChart :holdingsData="[500, 2000, 1000, 1200, 1000, 6000]" :key="5"></PieChart> 
                    </div>
                </Transition>
            </div>
        </div>

        <Transition name="fade">
            <h2 v-if="showMetric_3">You read a total of <b>20</b> articles.</h2>
        </Transition>

        <Transition name="fade">
            <h2  v-if="showMetric_4">You decided to subscribe to <b>Morningstar's premium advice</b>, enhancing the quality of the information you received.</h2>
        </Transition>

        <Transition name="fade">
            <h2 v-if="showMetric_5">You frequently made trades in the game's <b>pause</b> state, which tells us that you took time to think about each trade.</h2>
        </Transition>
    </div>
</template>

<script>

    import PieChart from '../Charts/PieChart'
    import CircleProgress from "vue3-circle-progress";

    import { playerDataStore } from '@/use/playerDataStore'
    

    export default {
        name: 'EndPage',
        components: {
            PieChart,
            CircleProgress,
        },
        data() {
            return {
                isShowingSubHeader: false,
                isShowingScore: false,
                showVerbage: false,
                showMetric_1: false,
                showMetric_2: false,
                showMetric_3: false,
                showMetric_4: false,
                showMetric_5: false,
                showChart1: false,
                showChart2: false,
                showChart3: false,
                showChart4: false,
                showChart5: false,
                portfolioSnapshots:playerDataStore.portfolioSnapshots
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
                this.showVerbage = true;
            }, 3000)
            setTimeout(() => {
                this.showMetric_1 = true;
            }, 5000)
            setTimeout(() => {
                this.showMetric_2 = true;
            }, 6000)
            setTimeout(() => {
                this.showChart1 = true;
            }, 7000)
            setTimeout(() => {
                this.showChart2 = true;
            }, 8000)
            setTimeout(() => {
                this.showChart3 = true;
            }, 9000)
            setTimeout(() => {
                this.showChart4 = true;
            }, 10000)
            setTimeout(() => {
                this.showChart5 = true;
            }, 11000)
            setTimeout(() => {
                this.showMetric_3 = true;
            }, 12000)
            setTimeout(() => {
                this.showMetric_4 = true;
            }, 13000)
            setTimeout(() => {
                this.showMetric_5 = true;
            }, 14000)
        },
        methods: {
            calculateOverConfidencePercentage() {
                console.log(playerDataStore.overconfidenceScore)
                return parseFloat(playerDataStore.overconfidenceScore).toFixed(2);
            }
        }
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
        margin-top: 30px;
    }

    .score {
        @include mds-level-1-heading($bold: false);
        margin-bottom: 35px;
    }

    .card-header {
        @include mds-level-1-heading($bold: false);
    }

    .percentage {
        @include mds-level-1-heading($bold: false);
        position: absolute;
        top: 390px;
    }

    h2 {
        @include mds-level-2-heading($bold: false);
        color: black;
        position: relative;
        bottom: 10px;
    }

    .click-here {
        @include mds-level-3-heading($bold: false);
        color: #969696;
        position: relative;
        bottom: 10px;
    }

    .click-here:hover {
        cursor: pointer;
    }

    .text {
        @include mds-body-text-l($bold: false);
        text-align: center;
        vertical-align: middle;
        margin-left: 30px;
        width: 75%;
    }

    .meter-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 50px;
    }

    .card-container {
        display: inline-flex;
        margin-top: 40px;
        margin-bottom: 70px;
    }

    .card {
        height: 450px;
        width: 300px;
        margin-left: 20px;
        margin-right: 20px;
        transition: 0.5s;
    }

    .card:hover {
        transform: scale(1.07);
    }

    .card-cover {
        position: absolute;
        border-radius: 5px;
        background: white;
        height: 475px;
        width: 300px;
        transition: 0.5s;
        border-bottom: 8px solid red;
    }

    .card-cover:hover {
        transform: scale(1.01);
    }

    .nice-boxshadow {
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07), 
                0 8px 16px rgba(49, 49, 49, 0.07),
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