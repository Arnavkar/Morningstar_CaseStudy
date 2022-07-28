import { reactive } from 'vue'

export const playerDataStore = reactive({
    overconfidenceScore:0,
    //didGetAdvisor:false,
    isAdvisorEnabled: false,
    timeSpentInPause:0,
    timeSpentInSimulation:0,
    articlesRead:[],
    // type, price, was the game pause or not, day, number of share, total value, percent invested 
    tradeHistory:[],
    currentPortfolio:{
        "CROC":{
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false,    
        },
        "SLTH":{
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false,
        },
        "TURT":{
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false, 
        },
        "GIRA":{
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false,    
        },
        "BUNY":{
            numberOfShares: 0,
            totalValue: 0,
            percentageValue: 0,
            recommendedPercentage: 0,
            isInPortfolio: false, 
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

    addStock(ticker, numberShares,SharePrice,currentDay){
		//this.purchasedStockName.push(sock)
		portfolio[ticker]['numberOfShares']+=numberShares
		portfolio[ticker]['totalValue']+= numberShares*pricePerShare
		portfolio[ticker]['isInPortfolio']=true
		history = {
            ticker:ticker,
			day: currentDay,
            tradeType:"buy",
			numberOfShares: numberShares, 
            SharePrice:SharePrice,
			totalValue: numberShares*SharePrice,
			percentageOfInvestedMoney: totalValue/currentMoney * 100,
            isTimeRunning:boolean, // fix this later
		}
		portfolio[ticker]['tradeHistory'].push(history)
		currentMoney-= numberShares*pricePerShare

		if (this.holding['percentageInvested']>= 50 ){
			this.overConfidence+= 10
		}
	},

 

    incrementOverConfidenceScore(value){
        this.overconfidenceScore+=value
    },

    incrementPauseTime(){
        this.timeSpentInPause++
    },

    incrementSimulationTime(){
        this.timeSpentInSimulation++
    },

    // addToTradeHistory(newTrade){
    //     tradeHistory.
    // }
})