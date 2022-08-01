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
    currentPortfolio:{
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
        portfolioValue = 0
        portfolio.forEach((ticker, data) => {
            let sharePrice = currentPrices[ticker]
		    data['totalValue'] = data['numberOfShares'] * sharePrice
            totalPortfolioValue += data['totalValue']
        })
    },

    // add currentDay as parameter in makeTrade front-end
    // parsefloat?
    // numShares is the number of shares being bought now
    // Updates the current portfolio as the user buys shares of a stock
    addStock(ticker, sharePrice, numShares, currentDay, isTimeRunning){
		portfolio[ticker]['numberOfShares'] += numShares
		portfolio[ticker]['totalValue'] = portfolio[ticker]['numberOfShares'] * sharePrice
		portfolio[ticker]['isInPortfolio'] = true
        portfolio[ticker]['isPurchasedAtLeastOnce'] = true
        accountBalance -= numShares * sharePrice

		history = {
            ticker: ticker,
			day: currentDay,
            tradeType: "BUY",
            price: sharePrice,
			numberOfShares: numShares,
			tradeValue: numShares * sharePrice,
			totalValue: portfolio[ticker]['totalValue'],
			percentageOfInvestedMoney: totalValue / accountBalance * 100,
            isTimeRunning: isTimeRunning,
		}

		tradeHistory.push(history)

		if (history['percentageOfInvestedMoney'] >= 40) {
			incrementOverConfidenceScore(10) // change value
		}

        if (isTimeRunning === true) {
            incrementOverConfidenceScore(10)
        }
	},

    // make sure to check if numShares exists in current portfolio
    // Updates the current portfolio as the user sells shares of a stock
    sellStock(ticker, sharePrice, numShares, currentDay, isTimeRunning){
        portfolio[ticker]['numberOfShares'] -= numShares
		portfolio[ticker]['totalValue'] = portfolio[ticker]['numberOfShares'] * sharePrice
        accountBalance += numShares * sharePrice
	    
        if (portfolio[ticker]['numberOfShares'] === 0) {
            portfolio[ticker]['isInPortfolio'] = false
        }

        history = {
            ticker: ticker,
			day: currentDay,
            tradeType: "SELL",
            price: sharePrice,
			numberOfShares: numShares,
            tradeValue: numShares * sharePrice,
			totalValue: portfolio[ticker]['totalValue'],
			percentageOfInvestedMoney: totalValue / accountBalance * 100, // ??? 
            isTimeRunning: isTimeRunning,
		}

		tradeHistory.push(history)

        if (isTimeRunning === true) {
            incrementOverConfidenceScore(10)
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
    }

    // addToTradeHistory(newTrade){
    //     tradeHistory.
    // }
})