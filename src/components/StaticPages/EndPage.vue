<template>
    <div class="end-page-main">
        <h1 class="header-one">Time's Up! Thank you for completing the Morningstar Overconfidence Trading Simulation!</h1>
        <Transition name="fade">
            <h1 class="score" v-if="isShowingSubHeader">Here is your score:</h1>
        </Transition>
        <Transition name="fade">
            <div v-if="isShowingScore" class="meter-wrapper">
                <div class="percentage">{{playerDataStore.overconfidenceScore.toFixed(2)}}</div>
                <circle-progress :fill-color=getFillColor() :percent=calculateOverConfidencePercentage() :size="300" :transition="200"/>
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="showVerbage">
                <h2> Your overconfidence level is: <b>{{getOverconfidenceRating()}}</b></h2>
                <h3> You made a total of <b>{{playerDataStore.tradeCount}} {{playerDataStore.tradeCount===1?"trade":"trades"}} over the course of the simulation</b> </h3>
                <hr>
            </div>
        </Transition>
        <!-- <div v-if="playerDataStore.annualSavings !== ''"></div> -->

        <Transition name="fade">
            <div v-if="showMetric_1">
                <h2>Based on your trade history, We saw that you made <b>{{playerDataStore.bigTrades.length}} {{playerDataStore.bigTrades.length===1?"trade":"trades"}}</b> with a value that was more than 40% of your uninvested money at the time.</h2>
                <h3>This could be a sign of overconfidence, especially if you are betting on a single stock to go up. It might be better to avoid such transactions that are a big portion of your portfolio.</h3>
                <hr>
            </div>
        </Transition>

        <Transition name="fade">
            <div v-if="showMetric_2">
                <h2> We analyzed snapshots of your portfolio: They were well balanced <b>{{playerDataStore.numBalancedPortfolioSnapshots}} out of 5 times.</b> </h2>
                <h3> Make sure you aren't putting all your eggs in one basket!.</h3>
            </div>
        </Transition>
        <div class="card-container" v-if="showMetric_2">
            <div class="card">
                <Transition name="fade">
                    <div v-if="showChart1" class="card-cover nice-boxshadow">
                        <h2 class="card-header">Day 40</h2>
                        <PieChart :holdingsData="playerDataStore.portfolioSnapshots[0].data" :key="1"></PieChart> 
                    </div>
                </Transition>
            </div>

            <div class="card">
                <Transition name="fade">
                    <div v-if="showChart2" class="card-cover nice-boxshadow">
                        <h2 class="card-header">Day 60</h2>
                        <PieChart :holdingsData="playerDataStore.portfolioSnapshots[1].data" :key="2"></PieChart>
                    </div>
                </Transition>
            </div>

            <div class="card">
                <Transition name="fade">
                    <div v-if="showChart3" class="card-cover nice-boxshadow">
                        <h2 class="card-header">Day 80</h2>
                        <PieChart :holdingsData="playerDataStore.portfolioSnapshots[2].data" :key="3"></PieChart>
                    </div>
                </Transition>
            </div>

            <div class="card">
                <Transition name="fade">
                    <div v-if="showChart4" class="card-cover nice-boxshadow">
                        <h2 class="card-header">Day 100</h2>
                        <PieChart :holdingsData="playerDataStore.portfolioSnapshots[3].data" :key="4"></PieChart>
                    </div>
                </Transition>
            </div>

            <div class="card">
                <Transition name="fade">
                    <div v-if="showChart5" class="card-cover nice-boxshadow">
                        <h2 class="card-header">Day 120 - End</h2>
                        <PieChart :holdingsData="playerDataStore.portfolioSnapshots[4].data" :key="5"></PieChart>
                    </div>
                </Transition>
            </div>
        </div>
        <Transition name="fade">
            <div v-if="showMetric_3">
                <hr>
                <h2>You read a total of <b>{{playerDataStore.numArticlesRead}}</b> articles {{playerDataStore.isAdvisorEnabled===true?"and advisor messages":""}}</h2>
                <h3> The more research you do, the better. But make sure your sources are as reliable as possible! </h3>
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="showMetric_4">
                <hr>
                <h2 v-if="playerDataStore.isAdvisorEnabled === true"> You <b>did</b> subscribe to Morningstar's premium advice</h2>
                <h2 v-else> You <b>did not</b> subscribe to Morningstar's premium advice. This could be a sign of overconfidence, especially if you are only looking of perspectives that reinforce your own</h2>
                <h3> Expert advice can help to enhance the overall objectiveness & quality of the information you receive, to helping you make better decisions</h3>
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="showMetric_5">
                <hr>
                <h2 >You made <b>{{playerDataStore.hastyTrades.length}} {{playerDataStore.hastyTrades.length===1?"trade":"trades"}}</b> in the game's running state.</h2>
                <h3> Players who chose to trade without stopping the time might be more prone to impulsive decision making</h3>
            </div>
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
                playerDataStore
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
            }, 7000)
            setTimeout(() => {
                this.showChart1 = true;
            }, 8000)
            setTimeout(() => {
                this.showChart2 = true;
            }, 9000)
            setTimeout(() => {
                this.showChart3 = true;
            }, 10000)
            setTimeout(() => {
                this.showChart4 = true;
            }, 11000)
            setTimeout(() => {
                this.showChart5 = true;
            }, 12000)
            setTimeout(() => {
                this.showMetric_3 = true;
            }, 14000)
            setTimeout(() => {
                this.showMetric_4 = true;
            }, 16000)
            setTimeout(() => {
                this.showMetric_5 = true;
            }, 18000)
        },
        methods: {
            calculateOverConfidencePercentage() {
                console.log(playerDataStore.overconfidenceScore)
                return parseFloat(playerDataStore.overconfidenceScore*100/250);
            },

            getOverconfidenceRating(){
                const value = this.calculateOverConfidencePercentage()

                if (value <= 30){
                    return "low"
                } else if (value <= 60){
                    return "average"
                } else {
                    return "high"
                }
            },

            getFillColor(){
                const rating = this.getOverconfidenceRating()
                if(rating==='high'){
                    return'#ff0000'
                } else if (rating==='average'){
                    return '#ffff00'
                } else {
                    return '#00ff00'
                }
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
    }

    h3 {
        @include mds-level-3-heading($bold: false);
        color: rgb(48, 48, 48);
        position: relative;
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