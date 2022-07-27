import { reactive } from 'vue'

export const playerDataStore = reactive({
    overconfidenceScore:0,
    didGetAdvisor:false,
    timeSpentInPause:0,
    timeSpentInSimulation:0,
    articlesRead:[],
    tradeHistory:{},
    currentPortfolio:{},


    markArticleAsRead(){
        //SOMEHOW STORE THIS ARTICLE AS READ
        //articlesRead.push(article)
        console.log("article was read")
    },

    get numArticlesRead(){
        return this.articlesRead.length
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