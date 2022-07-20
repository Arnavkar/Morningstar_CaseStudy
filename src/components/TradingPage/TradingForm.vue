<template>
    <Transition>
        <div v-if="!isTimeRunning" class="trading-form-container-main nice-boxshadow">
            <div class="trading-form-header">
                Trade
            </div>
            <div class="stock-form">
                <button v-if="selectedStock === 'CROC'" @click="updateSelectedStock('CROC')" class="stock-select-button-selected">CROC</button>
                <button v-else @click="updateSelectedStock('CROC')" class="stock-select-button">CROC</button>

                <button v-if="selectedStock === 'SLTH'" @click="updateSelectedStock('SLTH')" class="stock-select-button-selected">SLTH</button>
                <button v-else @click="updateSelectedStock('SLTH')" class="stock-select-button">SLTH</button>

                <button v-if="selectedStock === 'TURT'" @click="updateSelectedStock('TURT')" class="stock-select-button-selected">TURT</button>
                <button v-else @click="updateSelectedStock('TURT')" class="stock-select-button">TURT</button>

                <button v-if="selectedStock === 'GIRA'" @click="updateSelectedStock('GIRA')" class="stock-select-button-selected">GIRA</button>
                <button v-else @click="updateSelectedStock('GIRA')" class="stock-select-button">GIRA</button>

                <button v-if="selectedStock === 'BUNY'" @click="updateSelectedStock('BUNY')" class="stock-select-button-selected">BUNY</button>
                <button v-else @click="updateSelectedStock('BUNY')" class="stock-select-button">BUNY</button>
            </div>
            <div class="buy-sell-form">
                Amount ($): <input v-model="amount" class="price-input nice-boxshadow"/>

                <button v-if="orderType === 'BUY'" @click="updateOrderType('BUY')" class="buy-sell-button-selected nice-boxshadow my-hover">BUY</button>
                <button v-else @click="updateOrderType('BUY')" class="buy-sell-button nice-boxshadow my-hover">BUY</button>

                <button v-if="orderType === 'SELL'" @click="updateOrderType('SELL')" class="buy-sell-button-selected nice-boxshadow my-hover">SELL</button>
                <button v-else @click="updateOrderType('SELL')" class="buy-sell-button nice-boxshadow my-hover">SELL</button>

            </div>
            <div class="confirm-order-form">
                <button v-if="validateForm()" class="confirm-order-button nice-boxshadow my-hover" @click="confirmOrder()">Confirm Order</button>
                <button v-else class="confirm-order-button-disabled">Confirm Order</button>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    name: "TradingForm",
    data() {
        return {
            selectedStock: '',
            orderType: '',
            amount: 0,
        }
    },
    props: {
        isTimeRunning: { type: Boolean, },
        currentPrices: { type: Object },
        accountBalance: { type: Number },
        makeTrade: { type: Function },
    },
    methods: {
        validateForm() {
            return this.selectedStock != '' && this.orderType != '' && this.amount > 0 && this.amount >= 100 && this.amount <= this.accountBalance
        },
        updateSelectedStock(ticker) {
            this.selectedStock = ticker;
        },
        updateOrderType(type) {
            this.orderType = type;
        },
        confirmOrder() {
            console.log(this.currentPrices[this.selectedStock])
            let numShares = parseFloat(this.amount) / parseFloat(this.currentPrices[this.selectedStock])
            numShares = numShares.toFixed(2)
            const msg = "Are you sure you'd like to " 
                + this.orderType + " " + numShares 
                + " shares of " + this.selectedStock 
                + " for $" + this.amount + " at $" 
                + parseFloat(this.currentPrices[this.selectedStock]).toFixed(2) + " per share?";

            if (confirm(msg)) {
                this.makeTrade(this.selectedStock, this.amount, parseFloat(numShares))
            }
        }
    }
}
</script>

<style scoped lang="scss">

    @import '@mds/fonts';
    @import '@mds/constants';
    @import '@mds/utils-scss';
    @import '@mds/typography';
    @import '@mds/icon/src/icon_mixins';

    .trading-form-container-main {
        height: 285px;
        margin-top: 15px;
        border: 2px solid grey;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        background: white;
    }

    .trading-form-blocked {
        @include mds-body-text-l($bold: false);
        height: 100px;
        margin-top: 15px;
        border: 2px solid grey;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        line-height: 100px;
        background: white;
    }

    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.8s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .trading-form-header {
        @include mds-level-1-heading($bold: true);
        text-align: left;
        margin-left: 25px;
        margin-right: 25px;
        border-bottom: 2px solid black;
        padding-bottom: 5px;
    }

    .stock-select-button {
        @include mds-body-text-l($bold: false);
        width: 15%;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        background: white;
        border: 2px solid #cccccc;
        box-sizing: border-box;
        transition: 0.5s;
    }

    .stock-select-button-selected {
        @include mds-body-text-l($bold: true);
        width: 15%;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        border: none;
        background: #ff0000;
        color: white;
        box-sizing: border-box;
        transition: 0.5s;
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07),
                0 4px 16px rgba(37, 37, 37, 0.07),
                0 4px 32px rgba(37, 37, 37, 0.07),
    }

    .stock-select-button:hover {
        transform: scale(1.02);
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07),
                0 4px 16px rgba(37, 37, 37, 0.07),
                0 4px 32px rgba(37, 37, 37, 0.07),
    }

    .buy-sell-button {
        @include mds-body-text-l($bold: false);
        width: 25%;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 10px;
        background: white;
        border: none;
    }

    .buy-sell-button-selected {
        @include mds-body-text-l($bold: true);
        width: 25%;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 10px;
        background: white;
        border: none;
    }

    .confirm-order-form {
        border-top: 2px solid #cccccc;
        margin-top: 15px;
        margin-left: 25px;
        margin-right: 25px;
    }

    .confirm-order-button {
        @include mds-body-text-l($bold: true);
        background: #ff0000;
        color: white;
        width: 100%;
        height: 40px;
        border-radius: 10px;
        border: none;
        transition: 0.5s;
    }

    .confirm-order-button-disabled {
        @include mds-body-text-l($bold: true);
        background: #cccccc;
        color: white;
        width: 100%;
        height: 40px;
        border-radius: 10px;
        border: none;
        transition: 0.5s;
    }

    .stock-form {
        @include mds-body-text-l($bold: false);
        display: inline-flex;
        justify-content: space-evenly;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .my-hover {
        transition: 0.5s;
    }

    .my-hover:hover {
        transform: scale(1.01);
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07),
                0 4px 16px rgba(37, 37, 37, 0.07),
                0 4px 32px rgba(37, 37, 37, 0.07),

    }

    .buy-sell-form {
        @include mds-body-text-l($bold: false);
        display: inline-flex;
        justify-content: space-evenly;
        margin-top: 15px;
        height: 35px;
        line-height: 35px;
        margin-left: 15px;
    }

    .price-input {
        @include mds-body-text-l($bold: false);
        padding: 10px;
        width: 200px;
        height: 35px;
        position: relative;
        background: none;
        border-radius: 20px;
        box-sizing: border-box;
        font-size: 26px;
        color: black;
        outline: none;
        transition: .5s;
        caret-color: #cccccc;
        border: none;
    }

    .nice-boxshadow {
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07),
    }

</style>