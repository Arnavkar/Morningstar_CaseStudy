<template>
    <div class="intro-page-main">
        <h1>Click to Start</h1>
    </div>
</template>

<script>
    export default {
        name: 'IntroPage',
    }
</script>

<style scoped lang="scss">

    @import '@mds/fonts';
    @import '@mds/constants';
    @import '@mds/utils-scss';
    @import '@mds/typography';

    .intro-page-main {
        display: flex;
        height: 1200px;
        line-height: 1200px;
        align-items: center;
        justify-content: center;
    }

    h1 {
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

    h1:hover {
        cursor: pointer;
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

    .nice-boxshadow {
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07),
    }

</style>