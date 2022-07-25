import TimeUtility from 'timeUtility'

class PlayerDataTracker{
	constructor(initialMoney,SIMULATED_DURATION_IN_DAYS,REAL_DURATION_IN_MINUTES,article_data){
		this.isAdvisorEnabled = false
		this.pauseCount = 0
		this.articleClickCount = 0
		this.investedMoney = 0
		this.uninvestedMoney = initialMoney
		this.timeUtility = new TimeUtility(SIMULATED_DURATION_IN_DAYS,REAL_DURATION_IN_MINUTES,article_data)
		this.portfolio = {}
	}
	
	addStockToPurchasedStock(stock){
		this.purchasedStockName.push(stock)
	}

	enableAdvisor(){
		this.isAdvisorEnabled = true
		this.initialMoney = this.initialMoney - 1500
	}

	updatePortfolioPercentage(){
		// Do the math to update portfolio percentages
		//return updated this.endPercent 
		/*

		portfolio = {
			"GOOG":{
				"numberOfShares":20
				"totalValue":600
				"percentageValue": 15
				"recommendedPercentage":None
				"tradeHistory":[
					{
						"day":
						"value":
						"type":
	
					}


				]
			},
			"TSLA":{
	
			}
	
		}






		*/
	}

	start(){
		this.timeUtility.start()
		
	}

	isPortfolioBalanced(){
		//Do the math to see if portfolio is balanced
		//return Boolean or Value
	}

	incrementPauseCount(){
		this.pauseCount++
	}

	incrementArticleCount(){
		this.articleClickCount++
	}

	/*  

	---Additional things to think about---
		1. If our timeUtility class is now inside of this class, how is the outer front end application going to call utility methods like start() etc.
		2. To create a function that keeps executing with a set time interval, check out the documentation for javascript's 'setInterval()' function. I use it in the TimeUtility class too
		3. It would be worthwhile to do a little research into the actual computation to determine if a portfolio is unbalanced. 
			- We could talk to an intern or someone on the quant team to get an idea what kind of math is involved (I'll look into this as well)

	*/
}

/*
OVER CONFIDENCE METRICS

1. Are the picking an advisor when they start the game
2. Are the investing large sums of money, early in the game 
3. Is their portfolio extremely unbalanced
4. Are they reading articles -> how often they pause the game, how long spent in pause state? 
*/

// test






