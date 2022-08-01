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
                            <img class="stop-icon icon" @click="pauseSimulation();" src="../../assets/stop-icon.svg"/>
                        </div>
                        <div v-else>
                            <img class="play-icon icon" @click="resumeSimulation();" src="../../assets/play-icon.svg"/>
                        </div>
                    </div>
                </div>
                <div>
                    <u>Portfolio Value:</u>&nbsp;{{formatCurrency(calculateTotalPortfolioValue())}}
                </div>
                <div class="timer-section-bottom">
                    <u>Day:</u>&nbsp;{{ currentDay }} / {{ simulationDuration }}
                </div>
            </div>
            <div class="heading-container">
                Watchlist
            </div>
            <div v-for="stock in stocks" :key="stock.id">
                <StockCard :name="stock.name" :ticker="stock.ticker" :price="getCurrentPriceForStock(stock.ticker)" :updateCurrentStock="updateCurrentStock" :activeStock="activeStock"></StockCard>
            </div>
            <div class="heading-container-holdings">
                Holdings 
            </div>
            <PieChart :holdingsData="holdingsData" :key="pieKey"></PieChart>
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
            <TradingForm 
                :startSimulation="startSimulation" 
                :stopSimulation="stopSimulation" 
                :makeTrade="makeTrade"
                :currentPrices="getCurrentPrices()" 
                :accountBalance="accountBalance" 
                :numSharesOwned="numSharesOwned"
            ></TradingForm>
            <div class="portfolio-card-main nice-boxshadow">
                <div class="portfolio-card-header">
                    <b>Portfolio</b>
                </div>
                <div class="securities-container">
                    <div class="securities-row">
                        <StockCardPortfolio 
                            :name="'Crocodile Inc.'" 
                            :ticker="'CROC'" 
                            :price="getPortfolioValueForStock('CROC')" 
                            :percentageUpdate="calculatePercentage('CROC')"
                            class="security" 
                        ></StockCardPortfolio>
                        <StockCardPortfolio 
                            :name="'Sloth Entertainment'" 
                            :ticker="'SLTH'" 
                            :price="getPortfolioValueForStock('SLTH')"
                            :percentageUpdate="calculatePercentage('SLTH')"
                            class="security"
                        ></StockCardPortfolio>
                    </div>
                    <div class="securities-row">
                        <StockCardPortfolio 
                            :name="'Turtle'" 
                            :ticker="'TURT'" 
                            :price="getPortfolioValueForStock('TURT')"
                            :percentageUpdate="calculatePercentage('TURT')"
                            class="security"
                        ></StockCardPortfolio>
                        <StockCardPortfolio 
                            :name="'Giraffe Inc.'" 
                            :ticker="'GIRA'" 
                            :price="getPortfolioValueForStock('GIRA')"
                            :percentageUpdate="calculatePercentage('GIRA')"
                            class="security">
                        </StockCardPortfolio>
                    </div>
                    <div class="securities-bottom-row">
                        <StockCardPortfolio 
                            :name="'Bunny Corp.'" 
                            :ticker="'BUNY'" 
                            :price="getPortfolioValueForStock('BUNY')"
                            :percentageUpdate="calculatePercentage('BUNY')"
                            class="security">
                        </StockCardPortfolio>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-right section-margin">
            <div class="heading-container">
                Events
            </div>
            <NewsCard :title="'Push for EV Bill Rejected'" :subtitle="'The push for electric vehicles has ...'" :imageNum="1"></NewsCard>
            <NewsCard :title="'Google Eearnings Report'" :subtitle="'Higher-than-expected returns for tech giant ...'" :imageNum="2"></NewsCard>
            <NewsCard :title="'EV Stocks Crumble'" :subtitle="'With bill rejected, will TSLA prevail? '" :imageNum="3"></NewsCard>
            <NewsCard :title="'Silicon Shortage Catastrophe'" :subtitle="'The precious resource has been ...'" :imageNum="1"></NewsCard>
            <NewsCard :title="'Digital Entertainment Boosted'" :subtitle="'The media giant receives highest ... '" :imageNum="1"></NewsCard>
            <NewsCard :title="'Apple Eearnings Report'" :subtitle="'Higher-than-expected returns for tech giant ...'" :imageNum="3"></NewsCard>
        </div>
    </div>
</template>

<script>

    import StockChart from '../Charts/StockChart.vue'
    import PieChart from '../Charts/PieChart'

    import StockCard from './StockCard.vue'
    import NewsCard from './NewsCard.vue'
    import StockCardPortfolio from './StockCardPortfolio.vue'
    import ClockIcon from '../Icons/ClockIcon.vue'
    import TradingForm from './TradingForm.vue'

    import { aapl_data, nflx_data, tsla_data, goog_data, msft_data } from '../../stockData.js'
    import { defineComponent } from 'vue'
    import { stocks } from '../../data.js'

    import { playerDataStore } from '@/use/playerDataStore'

    export default defineComponent ({
        name: 'TradingPage',
        components: {
            StockChart,
            StockCard,
            NewsCard,
            StockCardPortfolio,
            ClockIcon,
            TradingForm,
            PieChart,
        },
        data() {
            return {
                playerDataStore,
                timeUtility,
                activeStock: 'CROC',
                stocks: stocks,
                stockData: [ aapl_data, nflx_data, tsla_data, goog_data, msft_data ],
                activeStockData: [],
                isTimeRunning: false,
                currentDay: 0,
                // simulationDuration: 120, //in Days
                // realDuration: 8, //in minutes
                simulationTimeElapsed: 0,
                accountBalance: playerDataStore.accountBalance,
                currentPortfolio: playerDataStore.currentPortfolio,
                portfolioValue: playerDataStore.portfolioValue,
                // holdingsData: [0, 0, 0, 0, 0, 20000],
                // numSharesOwned: [0, 0, 0, 0, 0],
                tradeHistory: playerDataStore.tradeHistory,
                buyHistory: {
                    'CROC': -1,
                    'SLTH': -1,
                    'TURT': -1,
                    'GIRA': -1,
                    'BUNY': -1,
                },
                pieKey: -1,
            }
        },
        computed:{
            simulationDurationInSeconds(){
                return this.simulationDuration * 86400
            },

            realDurationInSeconds(){
                return this.realDuration * 60
            },

            ratio(){
                return this.simulationDurationInSeconds/this.realDurationInSeconds
            }
        },
        methods: {
            calculatePercentage(ticker) {
                let marketPrice = this.getCurrentPriceForStock(ticker)
                let startPrice = this.buyHistory[ticker]
                let percentage = 0

                if (startPrice != -1) {
                    if (marketPrice > startPrice) {
                        percentage = (marketPrice / startPrice) - 1
                    } else if (marketPrice < startPrice) {
                        percentage = (1 - (marketPrice / startPrice)) * -1
                    }
                }
                return percentage
            },
            getPortfolioValueForStock(ticker) {
                // const tickers = ['CROC', 'SLTH', 'TURT', 'GIRA', 'BUNY']

                // let marketPrice = this.getCurrentPriceForStock(ticker)
                // let numShares = this.numSharesOwned[tickers.indexOf(ticker)]

                // let res = parseFloat(marketPrice) * parseFloat(numShares)
                let res = parseFloat(currentPortfolio[ticker]['totalValue'])

                return this.formatCurrency(res)
            },
            calculateTotalPortfolioValue() {
                let total = 0.0
                // let currentPrices = this.getCurrentPrices()

                // const tickers = ['CROC', 'SLTH', 'TURT', 'GIRA', 'BUNY']

                // for (let i = 0; i < this.numSharesOwned.length; i++) {
                //     total += currentPrices[tickers[i]] * this.numSharesOwned[i]
                // }

                total = playerDataStore.portfolioValue

                return parseFloat(total)
            },
            // price = total $ the user is investing during the buy/sell
            // currentPrice = price per share
            // stockValue = total value of stock OVERALLLLLLLLL
            makeTrade(action, ticker, price, shares) {

                // const tickers = ['CROC', 'SLTH', 'TURT', 'GIRA', 'BUNY']
                // const idx = tickers.indexOf(ticker)

                let currentPrice = this.getCurrentPriceForStock(ticker)
                // let stockValue = this.numSharesOwned[idx] * currentPrice

                if (action === 'BUY') {
                    playerDataStore.addStock(ticker, currentPrice, shares, currentDay, isTimeRunning)

                    // this.accountBalance -= parseFloat(price)
                    // this.holdingsData[5] -= parseFloat(price)
                    // this.holdingsData[idx] += parseFloat(price)
                    // this.numSharesOwned[idx] += parseFloat(shares)
                    // if (this.buyHistory[ticker] == -1) {
                    //     this.buyHistory[ticker] = currentPrice
                    // }
                } else if (action === 'SELL') {
                    playerDataStore.sellStock(ticker, currentPrice, shares, currentDay)

                    // this.accountBalance += parseFloat(price)
                    // this.holdingsData[5] += parseFloat(price)
                    // this.holdingsData[idx] = parseFloat(stockValue) - parseFloat(price)
                    // this.numSharesOwned[idx] -= parseFloat(shares)
                    // if (this.numSharesOwned[idx] == 0) {
                    //     this.buyHistory[ticker] = -1
                    // }
                }
                this.pieKey *= -1 // Force updates Pie Chart
                this.portfolioKey *= -1
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
            updateTimeData() {
                if(!this.isTimeRunning){
                    playerDataStore.incrementPauseTime()
                } else {
                    playerDataStore.incrementSimulationTime()
                    playerDataStore.updatePortfolio()
                    this.simulationTimeElapsed += this.ratio
                }

                const remainder = this.simulationTimeElapsed % 86400
                if (remainder === 0){
                    this.currentDay++
                }
            },
            startSimulation() {
                this.isTimeRunning = true
                this.interval = setInterval(this.updateTimeData,1000)
            },
            stopSimulation() {
                this.isTimeRunning = false
                clearInterval(this.interval);
            },
            pauseSimulation() {
                this.isTimeRunning = false
            },
            resumeSimulation() {
                if (this.interval == undefined){
                    this.startSimulation()
                    return //If game has not started, first start it 
                }
                this.isTimeRunning = true
                console.log(playerDataStore.timeSpentInPause)
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
        width: 100%;
        justify-content: center;
    }

    .section-margin {
        margin: 0 25px 0 25px;
    }

    .portfolio-card-main {
        height: 250px;
        margin-top: 15px;
        border: 2px solid grey;
        border-radius: 5px;
        display: flex;
        padding-top: 10px;
        justify-content: center;
        flex-direction: column;
        background: white;
    }

    .portfolio-card-header {
        @include mds-level-1-heading($bold: true);
        text-align: left;
        margin-left: 25px;
        margin-right: 25px;
        margin-bottom: 5px;
        border-bottom: 2px solid black;
    }

    .securities-container {
        padding-left: 22.5px;
        padding-right: 22.5px;
        display: flex;
        flex-direction: column;
    }

    .securities-row {
        margin-bottom: 5px;
        margin-top: 5px;
        display: inline-flex;
        height: 33%;
    }

    .securities-bottom-row {
        margin-bottom: 5px;
        margin-top: 5px;
        display: inline-flex;
        height: 33%;
        justify-content: center;
    }

    .security {
        border-radius: 5px;
        text-align: left;
        width: 50%;
    }

    .heading-container {
        @include mds-level-1-heading($bold: false);
        margin-top: 10px;
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
        height: 1200px;
        display: flex;
        flex-direction: column;
    }

    .section-right {
        width: 450px;
        height: 1200px;
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