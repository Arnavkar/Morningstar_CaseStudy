<template>
    <div class="stock-chart-main nice-boxshadow">
        <div class="button-row">
            <div class="buttons">
                <button v-if='activeTimeFilter === 0' class='time-button-selected' @click="getStockDataForPeriod('1W')">1W</button>
                <button v-else  @click="getStockDataForPeriod('1W'); updateActiveTimeFilter(0);">1W</button>

                <button v-if='activeTimeFilter === 1' class='time-button-selected' @click="getStockDataForPeriod('2W')">2W</button>
                <button v-else @click="getStockDataForPeriod('2W'); updateActiveTimeFilter(1);">2W</button>

                <button v-if='activeTimeFilter === 2' class='time-button-selected' @click="getStockDataForPeriod('1M')">1M</button>
                <button v-else @click="getStockDataForPeriod('1M'); updateActiveTimeFilter(2);">1M</button>

                <button v-if='activeTimeFilter === 3' class='time-button-selected' @click="getStockDataForPeriod('3M')">3M</button>
                <button v-else @click="getStockDataForPeriod('3M'); updateActiveTimeFilter(3);">3M</button>

                <button v-if='activeTimeFilter === 4' class='time-button-selected' @click="getStockDataForPeriod('6M')">6M</button>
                <button v-else @click="getStockDataForPeriod('6M'); updateActiveTimeFilter(4);">6M</button>

                <button v-if='activeTimeFilter === 5' class='time-button-selected' @click="getStockDataForPeriod('YTD')">YTD</button>
                <button v-else @click="getStockDataForPeriod('YTD') ; updateActiveTimeFilter(5);">YTD</button>
            </div>
            <div class="price-container">
                {{ parseFloat(allTimeStockData[allTimeStockData.length - 1].closePrice).toFixed(2) }}
            </div>
        </div>
        <div ref="resizeRef">
            <svg :key='currentDay' ref="svgRef">
                <g class="x-axis"/>
                <g class="y-axis"/>
            </svg>
        </div>
    </div>
</template>

<script>

    import * as d3 from 'd3'

    import { watchEffect, ref} from "vue";
    import {
        select,
    } from "d3";

    export default {
        name: 'StockChart',
        data() {
            return {
                activeTimeFilter: 5,
            }
        },
        methods: {
            updateActiveTimeFilter(n) {
                this.activeTimeFilter = n
            }
        },
        props: {
            allTimeStockData: { type: Array },
            simulationDuration: { type: Number },
            currentDay: { type: Number },
        },
        setup(props) {

            const svgRef = ref(null)
            const rootData = ref(props.allTimeStockData)
            const activeData = ref(props.allTimeStockData)
            const getStockDataForPeriod = (period) => {
                if (period === 'YTD') {
                    console.log(rootData.value.length)
                    activeData.value = rootData.value
                } else if (period === '6M') {
                    activeData.value = rootData.value.slice(rootData.value.length - 180, rootData.value.length)
                } else if (period === '3M') {
                    activeData.value = rootData.value.slice(rootData.value.length - 90, rootData.value.length)
                } else if (period === '1M') {
                    activeData.value = rootData.value.slice(rootData.value.length - 30, rootData.value.length)
                } else if (period === '2W') {
                    activeData.value = rootData.value.slice(rootData.value.length - 14, rootData.value.length)
                } else if (period === '1W') {
                    activeData.value = rootData.value.slice(rootData.value.length - 7, rootData.value.length)
                }
            }
            
            watchEffect(() => {
                
                // SVG object
                const svg = select(svgRef.value);

                d3.selectAll("svg > *").remove();

                // Visual config
                const yLabel = ""
                const color = "black"

                const width = 800
                const height = 400
                const marginTop = 30;
                const marginBottom = 30;
                const marginLeft = 40;
                const marginRight = 30;

                const strokeLinecap = "round"
                const strokeLinejoin = "round"
                const strokeWidth = 1.5
                const strokeOpacity = 1

                const curve = d3.curveLinear

                // Stock data
                const X = activeData.value.map(el => el.day)
                const Y = activeData.value.map(el => parseInt(el.closePrice))

                const I = d3.range(X.length);

                const xType = d3.scaleUtc
                const yType = d3.scaleLinear

                let xDomain = undefined
                let yDomain = undefined

                const xRange = [marginLeft, width - marginRight]
                const yRange = [height - marginBottom, marginTop]

                if (xDomain === undefined) xDomain = d3.extent(X);
                if (yDomain === undefined) yDomain = [d3.min(Y) - 7, d3.max(Y) + 10];

                // Construct scales and axes.
                const xScale = xType(xDomain, xRange)
                const scaleX = d3.scaleLinear().domain([0, activeData.value.length]).range(xRange)
                const yScale = yType(yDomain, yRange);
                const xAxis = d3.axisBottom(scaleX).ticks(10)
                const yAxis = d3.axisLeft(yScale).ticks(height / 50);

                // Line generator.
                const line = d3.line()
                    .curve(curve)
                    .x(i => xScale(X[i]))
                    .y(i => yScale(Y[i]));


                svg
                    .attr("width", width)
                    .attr("height", height)
                    .attr("viewBox", [0, 0, width, height])
                    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

                svg.append("g")
                    .attr("transform", `translate(0,${height - marginBottom})`)
                    .call(xAxis);

                svg.append("g")
                    .attr("transform", `translate(${marginLeft},0)`)
                    .call(yAxis)
                    .style("font-size", "12px")
                    .call(g => g.select(".domain").remove())
                    .call(g => g.selectAll(".tick line").clone()
                        .attr("x2", width - marginLeft - marginRight)
                        .attr("stroke-opacity", 0.1))
                    .call(g => g.append("text")
                        .attr("x", -marginLeft)
                        .attr("y", 10)
                        .attr("fill", "currentColor")
                        .attr("text-anchor", "start")
                        .text(yLabel));

                svg.append("path")
                    .attr("fill", "none")
                    .attr("stroke", color)
                    .attr("stroke-width", strokeWidth)
                    .attr("stroke-linecap", strokeLinecap)
                    .attr("stroke-linejoin", strokeLinejoin)
                    .attr("stroke-opacity", strokeOpacity)
                    .attr("d", line(I));


            });

            return { svgRef, activeData, getStockDataForPeriod };
        },
    }
    
</script>

<style scoped lang="scss">

    @import '@mds/fonts';
    @import '@mds/constants';
    @import '@mds/utils-scss';
    @import '@mds/typography';

    .stock-chart-main {
        height: 480px;
        margin-top: 15px;
        padding-bottom: 15px;
        border: 2px solid grey;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .nice-boxshadow {
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07), 
                0 8px 16px rgba(49, 49, 49, 0.07),
                0 16px 32px rgba(47, 47, 47, 0.07), 
                0 32px 64px rgba(52, 52, 52, 0.07);
    }

    .heading-container {
        @include mds-level-1-heading($bold: false);
        display: inline-flex;
        width: 900px;
        text-align: left;
        padding-left: 35px;
        padding-top: 35px;
        line-height: 45px;
    }

    .bold-heading {
        @include mds-level-1-heading($bold: true);
        margin-right: 15px;
    }

    .chart-container {
        border-radius: 5px;
        height: 500px;
        margin: 35px;
    }

    .button-row {
        display: inline-flex;
        justify-content: space-between;
        height: 45px;
        width: 87.5%;
        margin-left: 35px;
        margin-right: 35px;
        margin-top: 35px;
    }

    .price-container {
        text-align: right;
        margin-right: 18px;
    }

    .buttons {
        margin-left: 4px;
    }

    button {
        @include mds-body-text-l($bold: false);
        border: none;
        background: white;
    }

    button:hover {
        border-bottom: 3px solid #ff0000;
    }

    button:focus {
        border-bottom: 3px solid #ff0000;
    }

    button:active {
        transform: scale(0.85)
    }

    .time-button-selected {
        border-bottom: 3px solid #ff0000;
    }


</style>