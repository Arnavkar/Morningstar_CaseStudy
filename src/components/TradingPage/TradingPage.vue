<template>
    <div class="container-main">
        <div class="section-left section-margin">
            <div class="heading-container">
                Welcome,&nbsp;<b> Luke</b>
            </div>
            <div class="timer-section">
                <div class="timer-section-top">
                    <div class="timer-section-bottom">
                        <u>Account Balance:</u>&nbsp;{{formatCurrency(accountBalance)}}
                    </div>
                    <div class="clock-and-button">
                        <ClockIcon :timeRunning="isTimeRunning"></ClockIcon>
                        <div v-if="isTimeRunning === true">
                            <img class="stop-icon icon" @click="isTimeRunning = !isTimeRunning; stopSimulation();" src="../../assets/stop-icon-other.svg"/>
                        </div>
                        <div v-else>
                            <img class="play-icon icon" @click="isTimeRunning = !isTimeRunning; startSimulation();" src="../../assets/play-icon.svg"/>
                        </div>
                    </div>
                </div>
                <div>
                    <u>Portfolio Value:</u>&nbsp;{{formatCurrency(calculateTotalPortfolioValue())}}
                </div>
                <div class="timer-section-bottom">
                    <u>Day:</u>&nbsp;{{ currentDay }} / 200
                </div>
            </div>
            <div class="heading-container">
                Watchlist
            </div>
            <div v-for="stock in stocks" :key="stock.id">
                <StockCard :name="stock.name" :ticker="stock.ticker" :price="getCurrentPriceForStock(stock.ticker)" :updateCurrentStock="updateCurrentStock" :activeStock="activeStock"></StockCard>
            </div>
            <div class="heading-container-holdings">
                Your Holdings 
            </div>
            <PieChart :holdingsData="holdingsData" :key="pieChartKey"></PieChart>
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
            <TradingForm :makeTrade="makeTrade" :isTimeRunning="isTimeRunning" :currentPrices="getCurrentPrices()" :accountBalance="accountBalance" :numSharesOwned="numSharesOwned"></TradingForm>
        </div>
        <div class="section-right section-margin">
            <div class="heading-container">
                Events
            </div>
            <NewsCard :title="'Push for EV Bill Rejected'" :subtitle="'The push for electric vehicles has ...'" :imageNum="1"></NewsCard>
            <NewsCard :title="'Google Eearnings Report'" :subtitle="'Higher-than-expected returns for tech giant ...'" :imageNum="2"></NewsCard>
            <NewsCard :title="'EV Stocks Crumble'" :subtitle="'With bill rejected, will TSLA prevail? '" :imageNum="3"></NewsCard>
            <NewsCard :title="'Push for EV Bill Rejected'" :subtitle="'The push for electric vehicles has ...'" :imageNum="1"></NewsCard>
            <NewsCard :title="'EV Stocks Crumble'" :subtitle="'With bill rejected, will TSLA prevail? '" :imageNum="1"></NewsCard>
            <NewsCard :title="'Google Eearnings Report'" :subtitle="'Higher-than-expected returns for tech giant ...'" :imageNum="3"></NewsCard>
        </div>
    </div>
</template>

<script>

    import StockChart from '../Charts/StockChart.vue'
    import PieChart from '../Charts/PieChart'

    import StockCard from './StockCard.vue'
    import NewsCard from './NewsCard.vue'
    import ClockIcon from '../Icons/ClockIcon.vue'
    import TradingForm from './TradingForm.vue'

    import { aapl_data, nflx_data, tsla_data, goog_data, msft_data } from '../../stockData.js'
    import { defineComponent } from 'vue'
    import { stocks } from '../../data.js'

    export default defineComponent ({
        name: 'TradingPage',
        components: {
            StockChart,
            StockCard,
            NewsCard,
            ClockIcon,
            TradingForm,
            PieChart,
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
                accountBalance: 20000,
                portfolioValue: 0,
                holdingsData: [0, 0, 0, 0, 0, 20000],
                numSharesOwned: [0, 0, 0, 0, 0],
                pieChartKey: 0,
            }
        },
        methods: {
            calculateTotalPortfolioValue() {
                let total = 0.0
                let currentPrices = this.getCurrentPrices()

                const tickers = ['CROC', 'SLTH', 'TURT', 'GIRA', 'BUNY']

                for (let i = 0; i < this.numSharesOwned.length; i++) {
                    total += currentPrices[tickers[i]] * this.numSharesOwned[i]
                }
                
                return parseFloat(total)
            },
            makeTrade(action, ticker, price, shares) {

                const tickers = ['CROC', 'SLTH', 'TURT', 'GIRA', 'BUNY']
                const idx = tickers.indexOf(ticker)

                if (action === 'BUY') {
                    this.accountBalance -= parseFloat(price)
                    this.holdingsData[5] -= parseFloat(price)
                    this.holdingsData[idx] += parseFloat(price)
                    this.numSharesOwned[idx] += parseFloat(shares)
                    this.pieChartKey += 1
                } else if (action === 'SELL') {
                    this.accountBalance += parseFloat(price)
                    this.holdingsData[5] -= parseFloat(price)
                    this.holdingsData[idx] -= parseFloat(price)
                    this.numSharesOwned[idx] -= parseFloat(shares)
                    this.pieChartKey -= 1
                }

                console.log(this.holdingsdata)
            },
            formatCurrency(amount) {
                if (amount == 0) {
                    return '$0.00'
                }

                var formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                });
                return formatter.format(amount)
            },
            getCurrentPrices() {
                let rtn = {}
                for (let i = 0; i < this.stockData.length; i++) {
                    let name = this.stockData[i][0].ticker
                    let price = this.stockData[i][this.stockData[i].length - this.simulationDuration + this.currentDay - 1].closePrice
                    rtn[name] = price
                }
                return rtn
            },
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
                }, 2250) 
            },
            stopSimulation() {
                clearInterval(this.interval);
            }
        },
    })
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

    .heading-container-holdings {
        @include mds-level-1-heading($bold: false);
        margin-top: 20px;
        text-align: left;
        padding: 5px;
        display: inline-flex;
        border-bottom: 3px solid grey;
        margin-bottom: 10px;
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
        height: 175px;
        padding-left: 5px;
        padding-top: 10px;
        text-align: left;
        margin-bottom: 10px;
    }

    .timer-section-top {
        display: inline-flex;
        margin-top: 10px;
        margin-bottom: 5px;
        justify-content: space-between;
    }

    .timer-section-bottom {
        display: inline-flex;
        margin-top: 10px;
        margin-bottom: 5px;
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