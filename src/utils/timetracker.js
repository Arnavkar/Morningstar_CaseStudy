export class TimeTracker {
	constructor(SIMULATED_DURATION_IN_DAYS,REAL_DURATION_IN_MINUTES,article_data){
		this.delayInMilliseconds = 200
		this.realTimeElapsed = 0.0
		this.simulationTimeElapsed = 0.0
		this.pauseTimeElapsed = 0.0
		this.intervalID = ''
		this.isTimeRunning = false
		this.simulatedDuration = SIMULATED_DURATION_IN_DAYS * 86400
		this.realDuration = REAL_DURATION_IN_MINUTES * 60
		this.ratio = this.simulatedDuration/this.realDuration
		this.day = 0
		this.news_timeline = article_data
	}

	// createTimelineFromArticleData(article_data){
	// 	let temp = {}
	// 	article_data.forEach(article => {
	// 		let day = article['day']
	// 		if (temp.hasOwnProperty(day)){
	// 			temp[day].push(article)
	// 		} else {
	// 			temp[day] = []
	// 			temp[day].push(article)
	// 		}
	// 	})
	// 	console.log(temp)
	// 	return temp
	// }

	update = () => {
		if (this.isTimeRunning){
			this.realTimeElapsed+= this.delayInMilliseconds/1000
			this.simulationTimeElapsed+= this.ratio*this.delayInMilliseconds/1000
		} else {
			this.pauseTimeElapsed+=this.delayInMilliseconds/1000
		}

		if (this.simulationTimeElapsed > this.day * 86400){
			this.day++
			this.logTime()
			//this.checkIfNewsUpdateRequired()
		}
		this.checkIfSimulationEnded()
	}

	// checkIfNewsUpdateRequired(){
	// 	if (this.day in this.news_timeline){
	// 		let newsToUpdate = this.news_timeline[this.day]
	// 		newsToUpdate.forEach(article => console.log(article))
	// 			//addArticleToFeed(article)
	// 	} else {
	// 		console.log("No news update required")
	// 	}
	// }

	logTime(){
		console.log(`------------- CurrentDay: ${this.day} --------------`)
		console.log(`simulationTimeElapsed: ${this.simulationTimeElapsed}`)
		console.log(`pauseTimeElapsed: ${ this.pauseTimeElapsed }`)
		console.log(`realTimeElapsed(in_game): ${this.realTimeElapsed}`)
	}

	checkIfSimulationEnded(){
		if (this.realTimeElapsed == this.simulationDuration){
			this.stop(()=>{
				console.log("Reached Timer limit - Automatically stopped time")
			})
		}
	}

	start(){
		this.day = 1
		if (this.intervalID == ''){
			this.intervalID = setInterval(this.update,this.delayInMilliseconds)
			this.isTimeRunning = !this.isTimeRunning
			this.logTime()
		} else {
			console.log("Timer was already started - call pause(), resume() or stop() instead")
		}
	}

	pause(){
		if(this.isTimeRunning){
			this.isTimeRunning = !this.isTimeRunning
			this.logTime()
		} else {
			console.log("Timer already paused")
		}
	}

	resume(){
		if (this.intervalID == ''){
			this.start()
			return //If game has not started, first start it 
		}

		if (!this.isTimeRunning){
			this.isTimeRunning = !this.isTimeRunning
			this.logTime()
		} else {
			console.log("Timer already resumed")
		}
	}

	stop(callback){
		this.isTimeRunning = !this.isTimeRunning
		clearInterval(this.intervalID)
		if (callback){
			callback()
		} else {
			console.log("Timer was stopped")
			this.logTime()
		}
	}
}

// let article_data = [
// 	{
// 		"name":"article-1",
// 		"description":"",
// 		"day":1,
// 		"ticker":"TSLA"
// 	},
// 	{
// 		"name":"article-3",
// 		"description":"",
// 		"day":4,
// 		"ticker":"TSLA"
// 	},
// 	{
// 		"name":"article-2",
// 		"description":"",
// 		"day":1,
// 		"ticker":"GOOG"
// 	},
// 	{
// 		"name":"article-4",
// 		"description":"",
// 		"day":4,
// 		"ticker":"GOOG"
// 	},
// ]

// timer = new TimeUtility(200,20,article_data)
// timer.start()


