import { reactive } from 'vue'

export const playerDataStore = reactive({
    accountBalance: 20000,
    overconfidenceScore: 0,
    //didGetAdvisor:false,
    isAdvisorEnabled: false,
    timeSpentInPause: 0,
    timeSpentInSimulation: 0,
    articlesRead: [],
    // type, price, was the game pause or not, day, number of share, total value, percent invested 
    tradeHistory: [],
    portfolioValue: 0,
    portfolio:{
        "CROC":{
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false,
            isPurchasedAtLeastOnce: false
        },
        "SLTH":{
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false,
            isPurchasedAtLeastOnce: false
        },
        "TURT":{
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false,
            isPurchasedAtLeastOnce: false
        },
        "GIRA":{
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false,
            isPurchasedAtLeastOnce: false
        },
        "BUNY":{
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false,
            isPurchasedAtLeastOnce: false
        }
    },

    incrementOverConfidenceScore(value){
        this.overconfidenceScore += value
    },

    incrementPauseTime(){
        this.timeSpentInPause++
    },

    incrementSimulationTime(){
        this.timeSpentInSimulation++
    },

    get numArticlesRead(){
        return this.articlesRead.length
    },

    markArticleAsRead(){
        //SOMEHOW STORE THIS ARTICLE AS READ
        //articlesRead.push(article)
        console.log("article was read")
    },

    // Updates the current portfolio as the simulation time increases
    updatePortfolio(currentPrices){
        this.portfolioValue = 0
        this.portfolio.forEach((ticker, data) => {
            let sharePrice = currentPrices[ticker]
            // Using "portfolio[ticker]['totalValue']" to modify its value
            this.portfolio[ticker]['totalValue'] = data['numberOfShares'] * sharePrice
            this.portfolioValue += data['totalValue']
        })
    },

    // add currentDay as parameter in makeTrade front-end
    // parsefloat?
    // numShares is the number of shares being bought now
    // Updates the current portfolio as the user buys shares of a stock
    addStock(ticker, sharePrice, numShares, currentDay, isTimeRunning){
		this.portfolio[ticker]['numberOfShares'] += numShares
		this.portfolio[ticker]['totalValue'] = this.portfolio[ticker]['numberOfShares'] * sharePrice
		this.portfolio[ticker]['isInPortfolio'] = true
        this.portfolio[ticker]['isPurchasedAtLeastOnce'] = true
        this.accountBalance -= numShares * sharePrice

		let history = {
            ticker: ticker,
			day: currentDay,
            tradeType: "BUY",
            price: sharePrice,
			numberOfShares: numShares,
			tradeValue: numShares * sharePrice,
			totalValue: this.portfolio[ticker]['totalValue'],
			percentageOfInvestedMoney: this.totalValue / this.accountBalance * 100,
            isTimeRunning: isTimeRunning,
		}

		this.tradeHistory.push(history)

		if (history['percentageOfInvestedMoney'] >= 40) {
			this.incrementOverConfidenceScore(10) // change value
		}

        if (isTimeRunning === true) {
            this.incrementOverConfidenceScore(10)
        }
	},

    // make sure to check if numShares exists in current portfolio
    // Updates the current portfolio as the user sells shares of a stock
    sellStock(ticker, sharePrice, numShares, currentDay, isTimeRunning){
        this.portfolio[ticker]['numberOfShares'] -= numShares
		this.portfolio[ticker]['totalValue'] = this.portfolio[ticker]['numberOfShares'] * sharePrice
        this.accountBalance += numShares * sharePrice

        if (this.portfolio[ticker]['numberOfShares'] === 0) {
            this.portfolio[ticker]['isInPortfolio'] = false
        }

        let history = {
            ticker: ticker,
			day: currentDay,
            tradeType: "SELL",
            price: sharePrice,
			numberOfShares: numShares,
            tradeValue: numShares * sharePrice,
			totalValue: this.portfolio[ticker]['totalValue'],
			percentageOfInvestedMoney: this.totalValue / this.accountBalance * 100, // ??? 
            isTimeRunning: isTimeRunning,
		}

		this.tradeHistory.push(history)

        if (isTimeRunning === true) {
            this.incrementOverConfidenceScore(10)
        }
    }

    // addToTradeHistory(newTrade){
    //     tradeHistory.
    // }
})