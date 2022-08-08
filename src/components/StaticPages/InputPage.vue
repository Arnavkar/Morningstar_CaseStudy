<template>
    <div class = "info-page-main">
        <h1 class="header-one">Welcome to the Morningstar Overconfidence Trading Simulation</h1>
        <Transition name="fade">
            <h1 class="header-two" v-if="isShowingSubHeader">Before we begin, please input the following information:</h1>
        </Transition>

        <div class="form-container">
            <Transition name="fade">
                <form class = "form" v-if="showInputFields">
                    <label for="1" class = "input-header-name">Name</label>
                    <input type = "text" class = "input-field-name nice-boxshadow" placeholder="Required" id="1" v-model="playerName" maxlength="15" @change="clearErrorText" required> <span class="error"><p id="name_error"></p></span>

                    <label for="2" class = "input-header">Annual Salary</label>
                    <span class = "input-symbol-dollar">
                        <input type = "number" class = "input-field nice-boxshadow" placeholder="(optional)" id="2" v-model="annualSalary">
                    </span>

                    <label for="3" class = "input-header">Average Annual Savings</label>
                    <span class = "input-symbol-dollar">
                        <input type = "number" class = "input-field nice-boxshadow" placeholder="(optional)" id="3"  v-model="annualSavings">
                    </span>
                </form>
            </Transition>
        </div>
        <Transition name="fade">
            <div class ="click-here-container" v-if="showInputFields" >  
                <h3 @click="submitPlayerData();" class="click-here"> Next </h3>
            </div>   
        </Transition>
    </div>
</template>

<script>
    import { playerDataStore } from '@/use/playerDataStore'
    //import MdsFieldset from '@mds/fieldset'

    export default {
        name: 'InfoPage',
        data() {
            return {
                isShowingSubHeader: false,
                showInputFields: false,
                playerName:'', 
                annualSalary:'', 
                annualSavings:'',
                playerDataStore
            }
        },
        props: {
            switchToInfoPage: { type: Function },
        },
        mounted() {
            setTimeout(() => {
                this.isShowingSubHeader = true;
            }, 2000)
            setTimeout(() => {
                this.showInputFields = true;
            }, 3000)
        },
        methods:{
            submitPlayerData(){
                if(this.playerName === ''){
                    let nameError = "Please enter your name";
                    document.getElementById("name_error").innerHTML = nameError; 
                    document.getElementById("1").focus()
                } else {
                    this.playerDataStore.setPlayerData(this.playerName,this.annualSalary,this.annualSavings)
                    this.switchToInfoPage()
                    console.log(this.playerDataStore)
                }
            },
            clearErrorText(){
                document.getElementById("name_error").innerHTML = ""
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
        display:flex;
        flex-direction: column; 
        align-items: center;
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
        @include mds-level-1-heading($bold: false);
        background: rgb(173,18,131);
        background: -moz-linear-gradient(-45deg, rgba(173,18,131,1) 0%, rgba(222,71,172,1) 20%, rgba(249,85,79,1) 33%, rgba(249,85,79,1) 33%, rgba(255,122,81,1) 46%, rgba(249,85,79,1) 64%, rgba(219,79,247,1) 84%, rgba(161,78,244,1) 99%); 
        background: -webkit-linear-gradient(-45deg, rgba(173,18,131,1) 0%,rgba(222,71,172,1) 20%,rgba(249,85,79,1) 33%,rgba(249,85,79,1) 33%,rgba(255,122,81,1) 46%,rgba(249,85,79,1) 64%,rgba(219,79,247,1) 84%,rgba(161,78,244,1) 99%); 
        background: linear-gradient(135deg, rgba(173,18,131,1) 0%,rgba(222,71,172,1) 20%,rgba(249,85,79,1) 33%,rgba(249,85,79,1) 33%,rgba(255,122,81,1) 46%,rgba(249,85,79,1) 64%,rgba(219,79,247,1) 84%,rgba(161,78,244,1) 99%);
        background-position: 0px 0px;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;    
        -webkit-animation: gradient 10s infinite; 
        animation: gradient 10s infinite;
        color: rgba(0,0,0,0);
    
    }

    .click-here:hover {
        cursor: pointer;
    }

    .click-here-container{
        width:10%;
        display:flex;
        flex-direction: column; 
        align-items: center;
    }

    .text {
        @include mds-body-text-l($bold: false);
        text-align: center;
        vertical-align: middle;
        margin-left: 30px;
        width: 75%;
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

    @-webkit-keyframes gradient {
        0% {
        font-size: 64px;
        background-position: 1px 1px;
        }
    
        25%{
        background-position: 200px 100px;
        }
        
        50% {   
        background-position: 550px 100px;
        font-size: 66px;
        }
    
        75%{
        background-position: 200px 100px;
        }
    
        100% {
        font-size: 64px;
        background-position: 1px 1px;
        }
    }

    @keyframes gradient {
        0% {
            font-size: 64px;
            background-position: 1px 1px;
        }
    
        25%{
            background-position: 200px 100px;
        }
        
        50% {   
            background-position: 550px 100px;
            font-size: 66px;
        }
    
        75%{
            background-position: 200px 100px;
        }
    
        100% {
            font-size: 64px;
            background-position: 1px 1px;
        }
    }

    .input-field{
        width:50%;
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

    .input-field-name{
        width:30%;
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

    .input-field-name:focus {
        box-shadow: $mds-form-box-shadow-focus, $mds-form-box-shadow-hover;
        outline: none;
    }

    .input-field-name:invalid {
        box-shadow: $mds-form-box-shadow-error;
    }

    .nice-boxshadow {
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07),
    }
    
    .form-container{
        text-align: center;
        width:100%;
    }

    .form {
        display:flex;
        flex-direction: column; 
        align-items: center;
    }

    .input-header{
        @include mds-body-text-l($bold: true);
        text-align: left;
        width:51%;
        color: #cccccc;
    }

    .input-header-name{
        @include mds-body-text-l($bold: true);
        text-align: left;
        width:31%;
        color: #cccccc;
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

    .error{
        @include mds-body-text-m($bold: false);
        color: red;
        position: relative;
        top:-28px;
        padding-bottom: -28px;
    }

</style>