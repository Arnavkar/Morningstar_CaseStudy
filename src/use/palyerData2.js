import { reactive } from 'vue'

export const playerDataStore = reactive({
    accountBalance: 10000,
    overconfidenceScore: 0,
    stockCount:0,
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
        this.portfolio.forEach((ticker,data) => {
            let sharePrice = currentPrices[ticker]
            data['totalValue'] = data['numberOfShares'] * sharePrice
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
            this.incrementOverConfidenceScore(20)
        }

 // this to check for overcofidence 
// at this point we are only seeing if the user only has bought one singular stuck
        if (currentDay % 20 ==0 ){
            for(let[ticker,isInPoortfolio] of Object.entries(this.portfolio)){
                if (this.portfolio[ticker]['isInPortfolio'] == true){stockCount += 1}
                if(stockCount <= 3){ this.incrementOverConfidenceScore(50)}    
            }
            // this.portfolio.forEach([ticker, isInPortfolio] => {
            //     if (isInPortfolio == True ){
            //         stockCount+=1
            //     }
            //    if (stockCount <= 3){
            //     this.incrementOverConfidenceScore(100)
            //     } 
            // })
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
})
        // its balance if all of th shokes are in the proflio 

    
        // this next functin should be for the check points
            // the check point should be on day 20, 40,80,100,120 
        
    // balanceCheckPoint(ticker,numSahre, ){

    // }

    // addToTradeHistory(newTrade){
    //     tradeHistory.
    // }
    // my task is to add more function and add customozing the overconfidence metrics 

    // what should be stuff that causes overconfidence point to increase 
        // are they selliing a large amount of current stock give them 10 points 
        // buying a large amoount of current stock give theem 10 points 
        // not havinig a balance profoli 
        //
