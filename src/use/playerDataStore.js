import { reactive } from 'vue'

export const playerDataStore = reactive({
    accountBalance: 10000,
    overconfidenceScore: 30,
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
            isInPortfolio: false
        },
        "SLTH":{
            index: 1,
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            isInPortfolio: false
        },
        "TURT":{
            index: 2,
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            isInPortfolio: false
        },
        "GIRA":{
            index: 3,
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            isInPortfolio: false
        },
        "BUNY":{
            index: 4,
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            isInPortfolio: false
        }
    },

    incrementOverconfidenceScore(value){
        this.overconfidenceScore += value
    },

    incrementPauseTime(){
        this.timeSpentInPause++
    },

    incrementSimulationTime(){
        this.timeSpentInSimulation++
    },

    enableAdvisor(){
        this.isAdvisorEnabled = true
        this.accountBalance -= 1000
        this.incrementOverconfidenceScore(-50)
        console.log("Overconfidence score: " + this.overconfidenceScore)
    },
    
    markArticleAsRead(id){
        if(this.articlesRead.includes(id)){
            console.log(`article ${id} was already read`)
        } else {
            this.articlesRead.push(id)
            this.incrementOverconfidenceScore(-1)
            console.log( `Just read article no. ${id}`)
            console.log("Overconfidence score: " + this.overconfidenceScore)
        }
    },

    get overConfidenceScoreFromArticles(){
        return 30 - this.articlesRead.length
    },

    // Updates the current portfolio as the day changes
    updatePortfolio(currentPrices, currentDay){
        this.portfolioValue = 0

        for (const [ticker, data] of Object.entries(this.portfolio)) {
            let sharePrice = currentPrices[ticker]
            // Using "portfolio[ticker]['totalValue']" to modify its value
            this.portfolio[ticker]['totalValue'] = data['numberOfShares'] * sharePrice
            this.portfolioValue += data['totalValue']
            this.holdingsData[this.portfolio[ticker]['index']] = this.portfolio[ticker]['totalValue']
        }

        if ( (currentDay % 20 === 0) && (currentDay != 20) ) {
            let stockCount = 0

            for (const data of Object.values(this.portfolio)) {
                if (data['isInPortfolio'] === true) {
                    this.stockCount += 1
                }
            }
            
            if (stockCount <= 3) {
                this.incrementOverconfidenceScore(35 - (stockCount * 10))
                console.log("Overconfidence score: " + this.overconfidenceScore)
            }
        }
    },

    // Updates the current portfolio as the user buys shares of a stock
    addStock(ticker, sharePrice, totalPrice, numShares, currentDay, isTimeRunning){
        let uninvestedMoney = this.accountBalance
        this.accountBalance -= totalPrice
        this.portfolioValue += totalPrice
		this.portfolio[ticker]['numberOfShares'] += numShares
		this.portfolio[ticker]['totalValue'] += totalPrice
		this.portfolio[ticker]['isInPortfolio'] = true
        this.holdingsData[this.portfolio[ticker]['index']] = this.portfolio[ticker]['totalValue']
        this.holdingsData[5] = this.accountBalance

        let percentageOfInvestedMoney = (totalPrice / uninvestedMoney) * 100

		let history = {
            ticker: ticker,
			day: currentDay,
            accountBalance: this.accountBalance,
            tradeType: "BUY",
            sharePrice: sharePrice,
			numberOfShares: numShares,
			tradeValue: totalPrice,
			totalValue: this.portfolio[ticker]['totalValue'],
			percentageOfInvestedMoney: percentageOfInvestedMoney,
            isTimeRunning: isTimeRunning,
		}

		this.tradeHistory.push(history)

        // To do: Make percentageOfInvestedMoney in history a number, not NAN
		if (history['percentageOfInvestedMoney'] >= 40 && uninvestedMoney >= 1000) {
            console.log("Overconfidence score BEFORE: " + this.overconfidenceScore)
			this.incrementOverconfidenceScore(history['percentageOfInvestedMoney'] / 2) // change value
            console.log("Overconfidence score: " + this.overconfidenceScore)
		}

        if (isTimeRunning === true) {
            this.incrementOverconfidenceScore(5)
            console.log("Overconfidence score: " + this.overconfidenceScore)
        }
	},

    // Updates the current portfolio as the user sells shares of a stock
    sellStock(ticker, sharePrice, totalPrice, numShares, currentDay, isTimeRunning){
        this.accountBalance += totalPrice
        this.portfolioValue -= totalPrice
        this.portfolio[ticker]['numberOfShares'] -= numShares
		this.portfolio[ticker]['totalValue'] -= totalPrice
        this.holdingsData[this.portfolio[ticker]['index']] = this.portfolio[ticker]['totalValue']
        this.holdingsData[5] = this.accountBalance

        if (this.portfolio[ticker]['numberOfShares'] === 0) {
            this.portfolio[ticker]['isInPortfolio'] = false
        }

        let history = {
            ticker: ticker,
			day: currentDay,
            accountBalance: this.accountBalance,
            tradeType: "SELL",
            sharePrice: sharePrice,
			numberOfShares: numShares,
			tradeValue: totalPrice,
			totalValue: this.portfolio[ticker]['totalValue'],
			percentageOfInvestedMoney: 'N/A',
            isTimeRunning: isTimeRunning,
		}

		this.tradeHistory.push(history)

        if (isTimeRunning === true) {
            this.incrementOverconfidenceScore(5)
            console.log("Overconfidence score: " + this.overconfidenceScore)
        }
    }

})