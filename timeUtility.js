class TimeUtility {
	constructor(SIMULATION_DURATION_IN_SECONDS){
		this.delayInMilliseconds = 1000
		this.simulationTimeElapsed = 0.0
		this.pauseTimeElapsed = 0.0
		this.intervalID = ''
		this.isPaused = false
		this.simulationDuration = SIMULATION_DURATION_IN_SECONDS
	}

	update = () => {
		if (this.isPaused){
			this.pauseTimeElapsed++
		} else {
			this.simulationTimeElapsed++
		}
		this.logTime()
		this.checkIfSimulationEnded()
	}

	logTime(){
		console.log(`simulationTimeElapsed: ${this.simulationTimeElapsed}, pauseTimeElapsed: ${ this.pauseTimeElapsed }`)
	}

	checkIfSimulationEnded(){
		if (this.simulationTimeElapsed == this.simulationDuration){
			this.stop(()=>{
				console.log("Reached Timer limit - Automatically stopped time")
			})
		}
	}

	start(){
		if (this.intervalID == ''){
			this.intervalID = setInterval(this.update,this.delayInMilliseconds)
		} else {
			console.log("Timer was already started - call pause(), resume() or stop() instead")
		}
	}

	pause(){
		if(!this.isPaused){
			this.isPaused = !this.isPaused
		} else {
			console.log("Timer already paused")
		}
	}

	resume(){
		if (this.isPaused){
			this.isPaused = !this.isPaused
		} else {
			console.log("Timer already resumed")
		}
	}

	stop(callback){
		clearInterval(this.intervalID)
		if (callback){
			callback()
		} else {
			console.log("Timer was stopped")
			this.logTime()
		}
	}
}

timer = new TimeUtility(10.0)
timer.start()


