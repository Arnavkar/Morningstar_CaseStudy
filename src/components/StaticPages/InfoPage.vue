<template>
    <div class="info-page-main">
        <h1 class="header-one">Welcome to the Morningstar Overconfidence Trading Simulation</h1>
        <Transition name="fade">
            <h1 class="header-two" v-if="isShowingSubHeader">In this game, you will be following five stocks in a controlled trading environment.</h1>
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
            <h1 class="header-one" v-if="isShowingLastMessage">You will have 120 days to invest $20,000, good luck!</h1>
        </Transition>
        <Transition name="fade">
            <h3 @click="switchToTradingPage()" v-if="showClickAnywhere" class="click-here">Click here to continue.</h3>
        </Transition>
    </div>
</template>

<script>

    export default {
        name: 'InfoPage',
        data() {
            return {
                isShowingSubHeader: false,
                isShowingLastMessage: false,
                showSquareOne: false,
                showSquareTwo: false,
                showSquareThree: false,
                showSquareFour: false,
                showSquareFive: false,
                showClickAnywhere: false,
            }
        },
        props: {
            switchToTradingPage: { type: Function },
        },
        mounted() {
            setTimeout(() => {
                this.isShowingSubHeader = true;
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
                this.isShowingLastMessage = true;
            }, 9000)
            setTimeout(() => {
                this.showClickAnywhere = true;
            }, 9500)
        },
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
        color: #969696;
        position: relative;
        bottom: 10px;
    }

    .click-here:hover {
        cursor: pointer;
    }

    .text {
        @include mds-body-text-l($bold: false);
        text-align: center;
        vertical-align: middle;
        margin-left: 30px;
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

</style>