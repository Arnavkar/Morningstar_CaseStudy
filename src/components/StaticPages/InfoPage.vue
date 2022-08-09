<template>
    <div class="info-page-main">
        <Transition name="fade">
            <h1 class="header-two" v-if="isShowingHeader">In this game, you will be following five stocks in a controlled trading environment.</h1>
        </Transition>
        <div class="card-container">
            <div class="card">
                <Transition name="fade">
                    <div v-if="showSquareOne" class="card-cover nice-boxshadow">
                        <h2 class="card-header">CROC</h2>
                        <h3>Crocodile, Inc.</h3>
                        <p class="text">Consumer electronics, software</p>
                    </div>
                </Transition>
            </div>
                
            <div class="card">
                <Transition name="fade">
                    <div v-if="showSquareTwo" class="card-cover nice-boxshadow">
                        <h2 class="card-header">SLTH</h2>
                        <h3>Sloth Entertainment</h3>
                        <p class="text">Digital media, streaming</p>
                    </div>
                </Transition>
            </div>
                
            <div class="card">
                <Transition name="fade">
                    <div v-if="showSquareThree" class="card-cover nice-boxshadow">
                        <h2 class="card-header">TURT</h2>
                        <h3>Turtle</h3>
                        <p class="text">Automotive, clean energy</p>
                    </div>
                </Transition>
            </div>
                
            <div class="card">
                <Transition name="fade">
                    <div v-if="showSquareFour" class="card-cover nice-boxshadow">
                        <h2 class="card-header">GIRA</h2>
                        <h3>Giraffe, Inc.</h3>
                        <p class="text">Advertising, cloud computing</p>
                    </div>
                </Transition>
            </div>
                
            <div class="card">
                <Transition name="fade">
                    <div v-if="showSquareFive" class="card-cover nice-boxshadow">
                        <h2 class="card-header">BUNY</h2>
                        <h3>Bunny Corp.</h3>
                        <p class="text">Consumer electronics, software</p>
                    </div>
                </Transition>
            </div>
        </div>
        <Transition name="fade">
            <div v-if="isShowingSliderMessage">
                <h1 class="header-one">Please select your starting account balance.</h1>
                <h3>You may use the slider or provide a custom value that more accurately represents your financial situation.</h3>
            </div>
        </Transition> 
        <Transition name="fade">
            <div v-if="isShowingSlider">
                <form>
                    <span>
                        <span class="rangetext"> $1000  <input type="range" min="1000" max="10000" v-model="accountBalance" class="slider" id="myRange"/>  $10000      </span>
                        <span class="input-symbol-dollar">
                            <input type="number" class="input-field nice-boxshadow" id="1" v-model="accountBalance" @change="clearErrorText" required> <span class="error"><p id="value_error"></p></span>
                        </span>
                    </span>
                </form>
                
                <button class="click-here nice-boxshadow" v-on:click="submitAccountBalance">Submit</button>
            </div>
        </Transition>

        <Transition name="fade">
            <div v-if="isShowingAdvisorSubscription">
                <h1 class="header-one">You also have the option to subscribe to Morningstar Advisor before the simulation begins. This will cost ${{ fee.toFixed(2) }}.</h1>
                <h3> The advisor subscription provides you with additional investing tips, and additional information about the data presented to you </h3>
            </div>
        </Transition>
        <Transition name="fade">
            <div  v-if="isShowingAdvisorSubscription">
                <span class="toggletext">No   
                    <label class="switch">
                        <input type="checkbox" id="_button" v-model="advisorSubscription" v-on:click="toggleAdvisorSubscription();">
                        <span class="switch-slider round nice-boxshadow"></span>
                    </label>
                    Yes
                </span>
            </div>
        </Transition>
         <Transition name="fade">
            <button v-if="isShowingAdvisorSubscription" class="click-here nice-boxshadow" v-on:click="submitAdvisorSubscription">Submit</button>
        </Transition>


        <Transition name="fade">
            <h1 class="header-one" v-if="isShowingLastMessage">You will have 120 days to invest ${{accountBalance.toFixed(2)}}, good luck!</h1>
        </Transition>
        <Transition name="fade">
            <h3 @click="switchToTradingPage()" v-if="isShowingLastMessage" class="click-here">Click here to continue.</h3>
        </Transition>
    </div>
</template>

<script>
    import { playerDataStore } from '@/use/playerDataStore'

    export default {
        name: 'InfoPage',
        data() {
            return {
                isShowingHeader: false,
                showSquareOne: false,
                showSquareTwo: false,
                showSquareThree: false,
                showSquareFour: false,
                showSquareFive: false,
                isShowingSliderMessage: false,
                isShowingSlider:false,
                isShowingLastMessage: false,
                isShowingAdvisorSubscription:false,
                showClickAnywhere: false,
                accountBalance: 2350,
                advisorSubscription:false,
                playerDataStore,
                fee:235
            }
        },
        props: {
            switchToTradingPage: { type: Function },
        },
        mounted() {
            setTimeout(() => {
                this.isShowingHeader = false;
            }, 1000)
            setTimeout(() => {
                this.isShowingHeader = true;
            }, 2000)
            setTimeout(() => {
                this.showSquareOne = true;
            }, 3000)
            setTimeout(() => {
                this.showSquareTwo = true;
            }, 4000)
            setTimeout(() => {
                this.showSquareThree = true;
            }, 5000)
            setTimeout(() => {
                this.showSquareFour = true;
            }, 6000)
            setTimeout(() => {
                this.showSquareFive = true;
            }, 7000)
            setTimeout(() => {
                this.isShowingSliderMessage = true;
            }, 8000)
            setTimeout(() => {
                this.isShowingSlider = true;
            }, 9000)
        },
        methods:{
            submitAccountBalance(){
                if (this.accountBalance === '' || this.accountBalance < 1000){
                    let valueError = "Please enter a value greater than $1000";
                    document.getElementById("value_error").innerHTML = valueError; 
                    document.getElementById("1").focus()
                } else {
                    this.triggerAdvisorOption()
                }
                this.setFee()
            },

            submitAdvisorSubscription(){
                this.playerDataStore.setIsAdvisorEnabled(this.advisorSubscription)
                this.triggerLastMessage()
                if (this.advisorSubscription === true){
                    let fee = this.accountBalance*(1/10)
                    this.accountBalance -= fee
                }
                this.playerDataStore.setAccountBalance(this.accountBalance)
            },

            triggerAdvisorOption(){
                setTimeout(() => {
                    this.isShowingSliderMessage = false;
                    this.isShowingSlider = false;
                }, 0)
                setTimeout(() => {
                    this.isShowingAdvisorSubscription = true
                }, 2000)
            },

            triggerLastMessage(){
                setTimeout(() => {
                    this.isShowingAdvisorSubscription = false
                }, 0)
                setTimeout(() => {
                    this.isShowingLastMessage = true;
                    this.showClickAnywhere = true;
                }, 2000)

                console.log(this.playerDataStore)
            },

            clearErrorText(){
                document.getElementById("value_error").innerHTML = ""
            },

            toggleAdvisorSubscription(){
                this.advisorSubscription = !this.advisorSubscription
                console.log(this.advisorSubscription)
            },

            setFee(){
                this.fee = this.accountBalance/10
            }

        }


    }

</script>

<style scoped lang="scss">

    @import '@mds/fonts';
    @import '@mds/constants';
    @import '@mds/utils-scss';
    @import '@mds/typography';

    .info-page-main {
        margin-top: 100px;
    }

    .header-one {
        @include mds-level-1-heading($bold: false);
        margin-top: 100px;
    }

    .header-two {
        @include mds-level-1-heading($bold: false);
        margin-bottom: 50px;
    }

    .card-header {
        @include mds-level-1-heading($bold: false);
    }

    h3 {
        @include mds-level-3-heading($bold: false);
        color: #969696;
        position: relative;
        bottom: 10px;
    }

    .click-here {
        @include mds-level-3-heading($bold: false);
        color: #000000;
        position: relative;
        bottom: 10px;
        border-radius:5px;
        border: none;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        transition: 0.5s;
        margin-top:30px
    }

    .click-here:hover {
        cursor: pointer;
        opacity:1;
        transform: scale(1.02);
    }

    .input-field:invalid {
        box-shadow: $mds-form-box-shadow-error;
    }

    .error{
        @include mds-body-text-m($bold: false);
        color: red;
        position: relative;
        top:-28px;
        padding-bottom: -28px;
    }

    .text {
        @include mds-body-text-l($bold: false);
        text-align: center;
        vertical-align: middle;
        margin-left: 30px;
        width: 75%;
    }

    .rangetext {
        @include mds-level-3-heading($bold: false);
        text-align: center;
        vertical-align: middle;
        margin-left: 30px;
        width: 75%;
    }

     .toggletext {
        @include mds-level-3-heading($bold: false);
        text-align: center;
        vertical-align: middle;
        margin-left: 20px;
        margin-right: 20px;
        width: 75%;
    }

    .card-container {
        display: inline-flex;
    }

    .card {
        height: 250px;
        width: 250px;
        margin-left: 10px;
        margin-right: 10px;
        transition: 0.5s;
    }

    .card:hover {
        transform: scale(1.01);
    }

    .card-cover {
        position: absolute;
        border-radius: 5px;
        background: white;
        height: 275px;
        width: 250px;
        transition: 0.5s;
        border-bottom: 4px solid red;
    }

    .card-cover:hover {
        transform: scale(1.02);
    }

    .nice-boxshadow {
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07), 
                0 8px 16px rgba(49, 49, 49, 0.07),
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 2s;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .input-symbol-dollar {
        position: relative;
        width:100%
    }

    .input-symbol-dollar input {
        padding-left:18px;
    }

    .input-symbol-dollar:before {
        @include mds-body-text-l($bold: false);
        position: relative;
        content:"$";
        left: 15px;
    }

    .input-field{
        width:10%;
        height:25px;
        padding: 10px;
        margin-bottom: 20px;
        @include mds-body-text-l($bold: false);
        background: rgb(215, 215, 215);
        border-radius: 5px;
        font-size: 26px;
        color: black;
        outline: none;
        transition: .5s;
        caret-color: #cccccc;
        border: none;
    }

    .input-field:focus {
        box-shadow: $mds-form-box-shadow-focus, $mds-form-box-shadow-hover;
        outline: none;
    }

    /* The slider itself */
    .slider {  /* Override default CSS styles */
        appearance: none;
        width: 50%; /* Full-width */
        height: 15px; /* Specified height */
        background: #ffffff; /* Grey background */
        opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: .2s; /* 0.2 seconds transition on hover */
        transition: opacity .2s;
        border-radius:13px;
        border-style: solid;
        border-width: 2px;
        border-color: rgb(114, 114, 114);
    }

    /* Mouse-over effects */
    .slider:hover {
        opacity: 1; /* Fully shown on mouse-over */
    }

    /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 30px;
        height: 30px;
        background: #adadad;
        cursor: pointer;
        border-radius: 20px
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .switch-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .switch-slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .switch-slider {
        background-color: #2196F3;
    }

    input:focus + .switch-slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .switch-slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    .switch-slider.round {
        border-radius: 34px;
    }

    .switch-slider.round:before {
        border-radius: 50%;
    }

</style>