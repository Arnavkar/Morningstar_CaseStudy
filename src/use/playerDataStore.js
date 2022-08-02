import { reactive } from 'vue'

export const playerDataStore = reactive({
    accountBalance: 10000,
    overconfidenceScore: 0,
    //didGetAdvisor:false,
    isAdvisorEnabled: false,
    timeSpentInPause: 0,
    timeSpentInSimulation: 0,
    holdingsData: [0, 0, 0, 0, 0, 10000],
    articlesRead: [],
    // type, price, was the game pause or not, day, number of share, total value, percent invested 
    tradeHistory: [],
    portfolioValue: 0,
    portfolio:{
        "CROC":{
            index: 0,
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false,
            isPurchasedAtLeastOnce: false
        },
        "SLTH":{
            index: 1,
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false,
            isPurchasedAtLeastOnce: false
        },
        "TURT":{
            index: 2,
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false,
            isPurchasedAtLeastOnce: false
        },
        "GIRA":{
            index: 3,
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false,
            isPurchasedAtLeastOnce: false
        },
        "BUNY":{
            index: 4,
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
        // console.log("Daily update of portfolio")
        // console.log("Current prices: " + currentPrices)
        this.portfolioValue = 0

        for (const [ticker, data] of Object.entries(this.portfolio)) {
            let sharePrice = currentPrices[ticker]
            // Using "portfolio[ticker]['totalValue']" to modify its value
            this.portfolio[ticker]['totalValue'] = data['numberOfShares'] * sharePrice
            this.portfolioValue += data['totalValue']
            this.holdingsData[this.portfolio[ticker]['index']] = this.portfolio[ticker]['totalValue']
            // console.log("Ticker: " + ticker)
            // console.log("Share price: " + sharePrice)
            // console.log("Total value: " + this.portfolio[ticker]['totalValue'])
            // console.log("Portfolio value: " + this.portfolioValue)
        }
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
        // console.log("Ticker: " + ticker)
        // console.log("Share price: " + sharePrice)
        // console.log("Number of shares: " + numShares)
        // console.log("Account balance before: " + this.accountBalance)
        this.accountBalance -= numShares * sharePrice
        // console.log("Account balance after: " + this.accountBalance)
        this.holdingsData[this.portfolio[ticker]['index']] = this.portfolio[ticker]['totalValue']
        this.holdingsData[5] = this.accountBalance
        console.log("Account balance: " + this.accountBalance)
        console.log("Account balance in holdingsData: " + this.holdingsData[5])

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
        this.holdingsData[this.portfolio[ticker]['index']] = this.portfolio[ticker]['totalValue']
        this.holdingsData[5] = this.accountBalance

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

})