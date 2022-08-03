import { reactive } from 'vue'

export const playerDataStore = reactive({
    overconfidenceScore:0,
    didGetAdvisor:false,
    timeSpentInPause:0,
    timeSpentInSimulation:0,
    articlesRead:[],
    tradeHistory:{},
    currentPortfolio:{},

    markArticleAsRead(id){
        if(this.articlesRead.includes(id)){
            console.log(`article ${id} was already read`)
        } else {
            this.articlesRead.push(id)
            console.log( `Just read article no. ${id}`)
        }
    },

    get overConfidenceScoreFromArticles(){
        return 30 - this.articlesRead.length
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