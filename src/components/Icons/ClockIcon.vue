<template>
    <article class="clock nice-boxshadow">
        <div class="ticker-top"></div>
        <div class="ticker-bottom"></div>
        <div class="ticker-left"></div>
        <div class="ticker-right"></div>
        <div class="ticker-top-left"></div>
        <div class="ticker-top-right"></div>
        <div class="ticker-bottom-left"></div>
        <div class="ticker-bottom-right"></div>
        <div v-if="timeRunning === true">
            <div class="hours-container-moving"><div class="hours-moving"></div></div>
        </div>
        <div v-else>
            <div class="hours-container"><div class="hours"></div></div>
        </div>
        <div v-if="timeRunning === true" class="tick-dot"></div>
    </article>
</template>

<script>
export default {
    name: 'ClockIcon',
    props: {
        timeRunning: Boolean
    }
}
</script>

<style scoped lang="scss">

    .nice-boxshadow {
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07), 
                0 8px 16px rgba(49, 49, 49, 0.07),
                0 16px 32px rgba(47, 47, 47, 0.07), 
                0 32px 64px rgba(52, 52, 52, 0.07);
    }

    .clock {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #fff;
        background-size: 88%;
        position: relative;
        border: 2px solid black;
        margin-right: 5px;
    }

    .clock-and-button {
        display: inline-flex;
    }

    .hours-container-moving {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 5%;
        animation: rotate 4s infinite linear;
    }

    .hours-container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 5%;
    }

    .ticker-top {
        background: #000;
        height: 20%;
        position: absolute;
        width: 2.5%;
        left: 50%;
        top: -5%;
    }

    .ticker-bottom {
        background: #000;
        height: 20%;
        position: absolute;
        width: 2.5%;
        left: 50%;
        top: 85%;
    }

    .ticker-left {
        background: #000;
        width: 20%;
        height: 2.5%;
        position: absolute;
        top: 50%;
    }

    .ticker-right {
        background: #000;
        width: 20%;
        height: 2.5%;
        position: absolute;
        top: 50%;
        left: 85%;
    }

    .ticker-top-left {
        background: #000;
        width: 20%;
        height: 2.5%;
        position: absolute;
        top: 10%;
        left: 15%;
        transform: rotate(45deg);
        transform-origin: top left;
    }

    .ticker-top-right {
        background: #000;
        width: 20%;
        height: 2.5%;
        position: absolute;
        top: 25%;
        left: 75%;
        transform: rotate(-45deg);
        transform-origin: top left;
    }

    .ticker-bottom-left {
        background: #000;
        width: 20%;
        height: 2.5%;
        position: absolute;
        top: 85%;
        left: 10%;
        transform: rotate(-45deg);
        transform-origin: top left;
    }

    .ticker-bottom-right {
        background: #000;
        width: 20%;
        height: 2.5%;
        position: absolute;
        top: 70%;
        left: 80%;
        transform: rotate(45deg);
        transform-origin: top left;
    }

    .hours-moving {
        background: #ff0000;
        height: 40%;
        left: 45%;
        position: absolute;
        top: 10%;
        width: 10%;
        border-radius: 50%;
    }

    .hours {
        background: #ff0000;
        height: 40%;
        left: 42.5%;
        position: absolute;
        top: 10%;
        width: 10%;
        border-radius: 50%;
    }

    .tick-dot {
        position: relative;
        top: -5px;
        left: 12px;
        border-radius: 50%;
        height: 2px;
        width: 1px;
        background: black;
        animation: tick 4s infinite linear;
        animation-timing-function: cubic-bezier(0,0.1,0,0.6);
    }

    @keyframes rotate {
        100% {
            transform: rotateZ(360deg);
        }
    }

    @keyframes tick {
        50% {
            background: white;
        }
        100% {
            transform: translateY(-10px);
            background: white;
        }
    }

</style>