import TimeUtility from 'timeUtility'

class PlayerDataTracker{
	constructor(initialMoney,SIMULATED_DURATION_IN_DAYS,REAL_DURATION_IN_MINUTES,article_data){
		this.isAdvisorEnabled = false
		this.pauseCount = 0
		this.overConfidence = 0 // we add points when they are being too coky 
		this.currentMoney = 0
		this.articleClickCount = 0
		this.investedMoney = 0
		this.uninvestedMoney = initialMoney
		this.timeUtility = new TimeUtility(SIMULATED_DURATION_IN_DAYS,REAL_DURATION_IN_MINUTES,article_data)
		this.portfolio = {
			"CROC":{
				numberOfShares: 0,
				totalValue: 0,
				percentageValue: 0,
				recommendedPercentage: 0,
				isInPortfolio: false, 
				tradeHistory:[]
			},
			"SLTH":{
				numberOfShares: 0,
				totalValue: 0,
				percentageValue: 0,
				recommendedPercentage: 0,
				isInPortfolio: false, 
				tradeHistory:[]
			},
			"TURT":{
				numberOfShares: 0,
				totalValue: 0,
				percentageValue: 0,
				recommendedPercentage: 0,
				isInPortfolio: false, 
				tradeHistory:[]
			},
			"GIRA":{
				numberOfShares: 0,
				totalValue: 0,
				percentageValue: 0,
				recommendedPercentage: 0,
				isInPortfolio: false, 
				tradeHistory:[]
			},
			"BUNY":{
				numberOfShares: 0,
				totalValue: 0,
				percentageValue: 0,
				recommendedPercentage: 0,
				isInPortfolio: false, 
				tradeHistory:[]
			}
		}
	}	
	// for addStock w are updating numberOfShare,totoalValue, isInProtfolio, 
	//add stuff to current holding and trandHistory

	addStock(ticker, numberShares, pricePerShare,currentDay){
		//this.purchasedStockName.push(sock)
		portfolio[ticker]['numberOfShares']+=numberShares
		portfolio[ticker]['totalValue']+= numberShares*pricePerShare
		portfolio[ticker]['isInPortfolio']=true
		holding = {
			day: currentDay,
			numberOfShares: numberShares, 
			totalValue: numberShares*pricePerShare,
			percentageInvested: totalValue/currentMoney * 100
		}
		portfolio[ticker]['tradeHistory'].push(holding)
		currentMoney-= numberShares*pricePerShare

		if (this.holding['percentageInvested']>= 50 ){
			this.overConfidence+= 10
		}
	}

	enableAdvisor(){
		this.isAdvisorEnabled = true
		this.initialMoney = this.initialMoney - 100
	}

	// this needs to check every day 
	checkAdvisor(){
		if (isAdvisorEnabled === false){
			overConfidence+= 100
		}
	}

	updatePortfolioPercentage(){
		// Do the math to update portfolio percentages
		//return updated this.endPercent 
		// suggested ideal percent 

		portfolio.forEach(stock=> {
			
		});
		
	} 
	
// This fuction needs to update the updateProtfolioPercentage function

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








