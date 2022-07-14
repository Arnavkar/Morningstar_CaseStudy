<template>
    <div class="container-main">
        <div class="section-left section-margin">
            <div class="heading-container">
                Welcome,&nbsp;<b> Luke</b>
            </div>
            <div class="timer-section">
                <div class="timer-section-top">
                    <div class="timer-section-bottom">
                        <u>Account Balance:</u> &nbsp; $10,000
                    </div>
                    <div class="clock-and-button">
                        <ClockIcon :timeRunning="isTimeRunning"></ClockIcon>
                        <div v-if="isTimeRunning === true">
                            <img class="stop-icon icon" @click="isTimeRunning = !isTimeRunning; stopSimulation();" src="../../assets/stop-icon-other.svg"/>
                        </div>
                        <div v-else>
                            <img class="play-icon icon" @click="isTimeRunning = !isTimeRunning; startSimulation()" src="../../assets/play-icon.svg"/>
                        </div>
                    </div>
                </div>
                <div><u>Day:</u>&nbsp;{{ currentDay }} / 200</div>
            </div>
            <div class="heading-container">
                Watchlist
            </div>
            <div v-for="stock in stocks" :key="stock.id">
                <StockCard :name="stock.name" :ticker="stock.ticker" :price="getCurrentPriceForStock(stock.ticker)" :updateCurrentStock="updateCurrentStock" :activeStock="activeStock"></StockCard>
            </div>
        </div>
        <div class="section-middle section-margin">
            <div class="heading-container">
                Market Profile >&nbsp;<b>{{ activeStock }}</b>
            </div>
            <div v-if="activeStock === 'CROC'">
                <StockChart :key='currentDay' :currentDay='currentDay' :simulationDuration="simulationDuration" :allTimeStockData="stockData[0].slice(1, stockData[0].length - simulationDuration + currentDay)"></StockChart>
            </div>
            <div v-else-if="activeStock === 'SLTH'">
                <StockChart :key='currentDay' :currentDay='currentDay' :simulationDuration="simulationDuration" :allTimeStockData="stockData[1].slice(1, stockData[1].length - simulationDuration + currentDay)"></StockChart>
            </div>
            <div v-else-if="activeStock === 'TURT'">
                <StockChart :key='currentDay' :currentDay='currentDay' :simulationDuration="simulationDuration" :allTimeStockData="stockData[2].slice(1, stockData[2].length - simulationDuration + currentDay)"></StockChart>
            </div>
            <div v-else-if="activeStock === 'GIRA'">
                <StockChart :key='currentDay' :currentDay='currentDay' :simulationDuration="simulationDuration" :allTimeStockData="stockData[3].slice(1, stockData[3].length - simulationDuration + currentDay)"></StockChart>
            </div>
            <div v-else-if="activeStock === 'BUNY'">
                <StockChart :key='currentDay' :currentDay='currentDay' :simulationDuration="simulationDuration" :allTimeStockData="stockData[4].slice(1, stockData[4].length - simulationDuration + currentDay)"></StockChart>
            </div>
            <TradingForm></TradingForm>
        </div>
        <div class="section-right section-margin">
            <div class="heading-container">
                Events
            </div>
            <!-- <div v-for="article in articles" :key="article.id">
                <NewsCard :title="article.title" :subtitle="article.subtitle" :source="article.source"></NewsCard>
            </div> -->
        </div>
    </div>

</template>

<script>

    import StockChart from './StockChart.vue'
    import StockCard from './StockCard.vue'
    import ClockIcon from '../Icons/ClockIcon.vue'
    import TradingForm from './TradingForm.vue'
    
    //import NewsCard from './NewsCard.vue'

    import { aapl_data, nflx_data, tsla_data, goog_data, msft_data } from '../../stockData.js'
    import { stocks } from '../../data.js'

    export default {
        name: 'TradingPage',
        components: {
            StockChart,
            StockCard,
            ClockIcon,
            TradingForm,
        },
        data() {
            return {
                activeStock: 'CROC',
                stocks: stocks,
                stockData: [ aapl_data, nflx_data, tsla_data, goog_data, msft_data ],
                activeStockData: [],
                isTimeRunning: false,
                currentDay: 0,
                simulationDuration: 200,
            }
        },
        methods: {
            updateCurrentStock(ticker) {
                this.activeStock = ticker
            },
            getCurrentPriceForStock(ticker) {
                for (let i = 0; i < this.stockData.length; i++) {
                    if (ticker === this.stockData[i][0].ticker) {
                        let res = this.stockData[i][this.stockData[i].length - this.simulationDuration + this.currentDay - 1].closePrice
                        return parseFloat(res).toFixed(2)
                    }
                }
                return -1
            },
            startSimulation() {
                this.interval = setInterval(() => {
                    if (this.currentDay < 200) {
                        this.currentDay++;
                    }
                }, 2500) 
            },
            stopSimulation() {
                clearInterval(this.interval);
            }
        },
    }
</script>



<style scoped lang="scss">

    @import '@mds/fonts';
    @import '@mds/constants';
    @import '@mds/utils-scss';
    @import '@mds/typography';
    @import '@mds/icon/src/icon_mixins';

    .container-main {
        display: inline-flex;
    }

    .section-margin {
        margin: 0 25px 0 25px;
    }

    .heading-container {
        @include mds-level-1-heading($bold: false);
        text-align: left;
        padding: 5px;
        display: inline-flex;
        border-bottom: 3px solid grey;
    }

    .section-left {
        width: 450px;
        height: 1000px;
        display: flex;
        flex-direction: column;
    }

    .section-middle {
        @include mds-level-1-heading($bold: true);
        width: 900px;
        height: 1000px;
        display: flex;
        flex-direction: column;
    }

    .section-right {
        width: 450px;
        height: 500px;
        display: flex;
        flex-direction: column;
    }

    svg {
        /* important for responsiveness */
        display: block;
        fill: none;
        stroke: none;
        width: 100%;
        height: 100%;
        width: 1200px;
        overflow: visible;
        background: #eee;
    }

    .nice-boxshadow {
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07), 
                0 8px 16px rgba(49, 49, 49, 0.07),
                0 16px 32px rgba(47, 47, 47, 0.07), 
                0 32px 64px rgba(52, 52, 52, 0.07);
    }

    .clock-and-button {
        display: inline-flex;
    }

    .timer-section {
        @include mds-level-3-heading($bold: false);
        display: flex;
        flex-direction: column;
        height: 125px;
        padding-left: 5px;
        padding-top: 10px;
        text-align: left;
    }

    .timer-section-top {
        display: inline-flex;
        margin-top: 10px;
        margin-bottom: 10px;
        justify-content: space-between;
    }

    .timer-section-bottom {
        display: inline-flex;
        margin-top: 10px;
        margin-bottom: 10px;
    }


    .play-icon {
        height: 25px;
        width: 25px;
        margin-top: 1px;
    }

    .stop-icon {
        height: 23px;
        width: 25px;
    }

    .icon {
        margin-left: 5px;
        max-width: 25px;
        width: 25px;
    }

</style>