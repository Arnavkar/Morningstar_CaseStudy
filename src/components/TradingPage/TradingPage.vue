<template>
    <div class="container-main">
        <div class="section-left section-margin">
            <div class="heading-container">
                Welcome,&nbsp;<b> {{playerDataStore.playerName.slice(0,15)}}</b>
            </div>
            <div class="timer-section">
                <div class="timer-section-top">
                    <div class="timer-section-bottom">
                        <u>Account Balance:</u>&nbsp;{{formatCurrency(playerDataStore.accountBalance)}}
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
                    <u>Portfolio Value:</u>&nbsp;{{formatCurrency(playerDataStore.portfolioValue)}}
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
                :portfolio="portfolio"
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
            <TransitionGroup name="fade">
                <div v-for="article in currentNewsFeed.peekN(currentNewsFeed.size())" :key="article.id">
                    <NewsCard :title="article.headline" :subtitle="article.description" :imageNum=1 :_article_id="article.id"></NewsCard>
                </div>
            </TransitionGroup>
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

    var RingBuffer = require('ringbufferjs');
    import { newsData } from '../../news.js'

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
        props: {
            switchToEndPage: { type: Function },
        },
        data() {
            return {
                playerDataStore,
                activeStock: 'CROC',
                stocks: stocks,
                stockData: [ aapl_data, nflx_data, tsla_data, goog_data, msft_data ],
                newsData,
                currentNewsFeed: new RingBuffer(6),
                activeStockData: [],
                isTimeRunning: false,
                currentDay: 0,
                simulationDuration: 120, //in Days
                realDuration: 8, //in minutes
                simulationTimeElapsed: 0,
                overconfidenceScore: playerDataStore.overconfidenceScore,
                accountBalance: playerDataStore.accountBalance,
                portfolio: playerDataStore.portfolio,
                portfolioValue: playerDataStore.portfolioValue,
                holdingsData: playerDataStore.holdingsData,
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
            },
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
                let res = parseFloat(this.portfolio[ticker]['totalValue'])

                return this.formatCurrency(res)
            },
            makeTrade(action, ticker, sharePrice, totalPrice, shares) {
                if (action === 'BUY') {
                    playerDataStore.addStock(ticker, sharePrice, totalPrice, shares, this.currentDay, this.isTimeRunning)
                    if (this.buyHistory[ticker] == -1) {
                        this.buyHistory[ticker] = sharePrice
                    }
                } else if (action === 'SELL') {
                    playerDataStore.sellStock(ticker, sharePrice, totalPrice, shares, this.currentDay)
                    if (this.portfolio[ticker]['numberOfShares'] == 0) {
                        this.buyHistory[ticker] = -1
                    }
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
            updateNewsFeed(){
                for (const [key, article] of Object.entries(newsData)){
                    if (article["day"] == this.currentDay){
                        this.currentNewsFeed.enq(article)
                        console.log(`article no. ${key}, '${article.headline}'' was added to ring buffer`)
                    }
                }
            },
            updateTimeData(){
                if(!this.isTimeRunning){
                    playerDataStore.incrementPauseTime()
                } else {
                    playerDataStore.incrementSimulationTime()
                    this.simulationTimeElapsed += this.ratio
                }
                const remainder = this.simulationTimeElapsed % 86400
                if (remainder === 0){
                    this.currentDay++
                    this.currentPrices = this.getCurrentPrices()
                    playerDataStore.updatePortfolio(this.currentPrices, this.currentDay)
                    this.updateNewsFeed()
                    if (this.currentDay === 120) {
                        this.stopSimulation()
                    }
                }

                if (this.currentDay === 121){
                    // TODO: Currently Set to 15 just for testing purposes, should set to 120
                    this.stopSimulation()
                }

                if ([40,60,80,100,120].includes(this.currentDay)){
                    this.playerDataStore.addPortfolioSnapshot(this.currentDay)
                }
            },
            startSimulation() {
                this.isTimeRunning = true
                this.updateNewsFeed()
                this.interval = setInterval(this.updateTimeData,1000)
            },
            stopSimulation() {
                this.isTimeRunning = false
                clearInterval(this.interval);
                this.switchToEndPage()
            },
            pauseSimulation() {
                this.isTimeRunning = false
            },
            resumeSimulation() {
                
                if (this.interval == undefined){
                    console.log("Was Called")
                    this.startSimulation()
                    return //If game has not started, first start it 
                }
                this.isTimeRunning = true
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