<template>
    <div class="stock-card-main">
            <div class="ticker-and-name-container">
                <div class="ticker-container">
                    {{ ticker }}
                </div>
                <div class="name-container">
                     {{ name }}
                </div>
            </div>
            <div class="price-container">
                <div v-if="percentageUpdate > 0" class="percentage-container-green">
                    {{ formatCurrency(percentageUpdate) }}
                </div>
                <div v-else-if="percentageUpdate < 0" class="percentage-container-red">
                    {{ formatCurrency(percentageUpdate) }}
                </div>
                <div v-else class="percentage-container-grey">
                    {{ formatCurrency(percentageUpdate) }}
                </div>
                {{ price }}
            </div>
    </div>
</template>

<script>
    export default {
        name: 'StockCardPortfolio',
        data() {
            return {
                current: this.ticker,
            }
        },
        props: {
            name: { type: String },
            ticker: { type: String },
            price: { type: String },
            percentageUpdate: { type: Number },
            activeStock: { type: String},
            updateCurrentStock: { type: Function },
        },
        methods: {
            changeStock(s) {
                this.updateCurrentStock(s);
            },
            isActiveStock() {
                return this.ticker === this.activeStock
            },
            formatCurrency(amount) {
                if (amount == 0) {
                    return '0.00'
                }
                if (amount > 0) {
                    return '+ ' + amount.toFixed(2) + '%'
                } else {
                    return amount.toFixed(2) + '%'
                }
            },
        }
    }
</script>

<style scoped lang="scss">

    @import '@mds/fonts';
    @import '@mds/constants';
    @import '@mds/utils-scss';
    @import '@mds/typography';

    .stock-card-main {
        @include mds-level-3-heading($bold: false);
        background: white;
        border: 2px solid grey;
        border-radius: 5px;
        margin-left: 5px;
        margin-right: 5px;
        padding: 5px;
        transition: 0.5s;
        box-shadow: 2px 2px 2px rgba(4,4,4,0.1);
        display: inline-flex;
        justify-content: space-between;
    }

    .stock-card-main-selected {
        @include mds-level-3-heading($bold: false);
        background: white;
        border: 2px solid grey;
        border-radius: 5px;
        width: 450px;
        padding: 5px;
        margin-top: 15px;
        transition: 0.5s;
        box-shadow: 2px 2px 2px rgba(4,4,4,0.1);
        display: inline-flex;
        justify-content: space-between; 
        border-left: 4.5px solid red;
    }

    .stock-card-main:hover {
        border-left: 4.5px solid red;
    }

    .name-container {
        @include mds-body-text-m($bold: false);
        margin-top: 7px;
        margin-left: 15px;
        color: #8a8a8a;
    }

    .ticker-and-name-container {
        display: inline-flex;
        text-align: left;
    }

    .price-container {
        display: inline-flex;
        text-align: right;
    }

    .percentage-container-green {
        @include mds-body-text-m($bold: true);
        color: #00af41;
        margin-right: 15px;
        line-height: 32.5px;
    }

    .percentage-container-red {
        @include mds-body-text-m($bold: true);
        color: #ff0000;
        margin-right: 15px;
        line-height: 32.5px;
    }

    .percentage-container-grey {
        @include mds-body-text-m($bold: true);
        margin-right: 15px;
        color: #cccccc;
        line-height: 32.5px;
    }

    .nice-boxshadow {
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07),
    }

</style>