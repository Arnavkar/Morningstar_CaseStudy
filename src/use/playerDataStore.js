import { reactive } from 'vue'

export const playerDataStore = reactive({
    accountBalance: 10000,
    overconfidenceScore: 0,
    isAdvisorEnabled: false,
    timeSpentInPause: 0,
    timeSpentInSimulation: 0,
    holdingsData: [0, 0, 0, 0, 0, 10000],
    articlesRead: [],
    tradeHistory: [],
    portfolioValue: 0,
    portfolio:{
        "CROC":{
            index: 0,
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false
        },
        "SLTH":{
            index: 1,
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false
        },
        "TURT":{
            index: 2,
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false
        },
        "GIRA":{
            index: 3,
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false
        },
        "BUNY":{
            index: 4,
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false
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
        this.overconfidenceScore -= 3
        console.log("Overconfidence score: " + this.overconfidenceScore)
    },

    // Updates the current portfolio as the simulation time increases
    updatePortfolio(currentPrices){
        // console.log("Daily update of portfolio")
        // console.log("Current prices: " + currentPrices)
        this.portfolioValue = 0

        for (const [ticker, data] of Object.entries(this.portfolio)) {
            let sharePrice = currentPrices[ticker]
            // Using "portfolio[ticker]['totalValue']" to modify its value
            this.portfolio[ticker]['totalValue'] = data['numberOfShares'] * sharePrice
            this.portfolioValue += data['totalValue']
            this.holdingsData[this.portfolio[ticker]['index']] = this.portfolio[ticker]['totalValue']
        }
    },

    // Updates the current portfolio as the user buys shares of a stock
    // totalPrice is sharePrice * numShares
    addStock(ticker, sharePrice, totalPrice, numShares, currentDay, isTimeRunning){
        console.log("totalPrice is " + this.totalPrice)
        console.log("Account balance before purchasing stock: " + this.accountBalance)
        this.accountBalance -= totalPrice
		this.portfolio[ticker]['numberOfShares'] += numShares
		this.portfolio[ticker]['totalValue'] += totalPrice
		this.portfolio[ticker]['isInPortfolio'] = true
        this.holdingsData[this.portfolio[ticker]['index']] = this.portfolio[ticker]['totalValue']
        this.holdingsData[5] = this.accountBalance
        console.log("Account balance after purchasing stock: " + this.accountBalance)

		let history = {
            ticker: ticker,
			day: currentDay,
            tradeType: "BUY",
            sharePrice: sharePrice,
			numberOfShares: numShares,
			tradeValue: totalPrice,
			totalValue: this.portfolio[ticker]['totalValue'],
			percentageOfInvestedMoney: this.totalValue / this.accountBalance * 100,
            isTimeRunning: isTimeRunning,
		}

		this.tradeHistory.push(history)

		if (history['percentageOfInvestedMoney'] >= 40) {
			this.incrementOverConfidenceScore(50) // change value
            console.log("Overconfidence score: " + this.overconfidenceScore)
		}

        if (isTimeRunning === true) {
            this.incrementOverConfidenceScore(10)
            console.log("Overconfidence score: " + this.overconfidenceScore)
        }
	},

    // make sure to check if numShares exists in current portfolio
    // Updates the current portfolio as the user sells shares of a stock
    sellStock(ticker, sharePrice, totalPrice, numShares, currentDay, isTimeRunning){
        console.log("Account balance before selling stock: " + this.accountBalance)
        this.accountBalance += totalPrice
        this.portfolio[ticker]['numberOfShares'] -= numShares
		this.portfolio[ticker]['totalValue'] -= totalPrice
        this.holdingsData[this.portfolio[ticker]['index']] = this.portfolio[ticker]['totalValue']
        this.holdingsData[5] = this.accountBalance
        console.log("Account balance after purchasing stock: " + this.accountBalance)

        if (this.portfolio[ticker]['numberOfShares'] === 0) {
            this.portfolio[ticker]['isInPortfolio'] = false
        }

        let history = {
            ticker: ticker,
			day: currentDay,
            tradeType: "SELL",
            sharePrice: sharePrice,
			numberOfShares: numShares,
			tradeValue: totalPrice,
			totalValue: this.portfolio[ticker]['totalValue'],
			percentageOfInvestedMoney: this.totalValue / this.accountBalance * 100,
            isTimeRunning: isTimeRunning,
		}

		this.tradeHistory.push(history)

        if (isTimeRunning === true) {
            this.incrementOverConfidenceScore(10)
            console.log("Overconfidence score: " + this.overconfidenceScore)
        }
    }

})