import TimeUtility

class PlayerDataTracker{
	constructor(initialMoney,SIMULATED_DURATION_IN_DAYS,REAL_DURATION_IN_MINUTES,article_data){
		this.isAdvisorEnabled = false
		this.numberOfClicks = 0
		this.initialMoney = initialMoney
		this.timeUtility = new TimeUtility(SIMULATED_DURATION_IN_DAYS,REAL_DURATION_IN_MINUTES,article_data)
		this.purchasedStockName = [] //use maps/dictionary?
		this.startingPercent = []
		this.endPercent = []
		this.finalMoney = 0


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

	}

	isPortfolioBalanced(){
		//Do the math to see if portfolio is balanced
		//return Boolean or Value
	}

	incrementNumberOfClicks(){
		this.numberOfClicks++
	}
}

/*
OVER CONFIDENCE METRICS

1. Are the picking an advisor when they start the game
2. Are the investing large sums of money, early in the game 
3. Is their portfolio extremely unbalanced
4. Are they reading articles -> how often they pause the game, how long spent in pause state? 
*/