<template>
    <button v-if="isActiveStock()" class="stock-card-main-selected" @click="changeStock(current)">
            <div class="ticker-container">
                {{ ticker }}
            </div>
            <div class="price-container">
                {{ price }}
            </div>
    </button>
    <button v-else class="stock-card-main" @click="changeStock(current)">
            <div class="ticker-container">
                {{ ticker }}
            </div>
            <div class="price-container">
                {{ price }}
            </div>
    </button>
</template>

<script>
    export default {
        name: 'StockCard',
        data() {
            return {
                current: this.ticker,
            }
        },
        props: {
            ticker: { type: String },
            price: { type: String },
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
        width: 450px;
        padding: 5px;
        margin-top: 15px;
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
        transform: scale(1.02);
        border-left: 4.5px solid red;
        //box-shadow: 2.5px 5px 8px rgba(255, 0, 0, 0.3);
    }

    .ticker-container {
        text-align: left;
        padding-left: 5px;
    }

    .price-container {
        text-align: right;
    }

</style>