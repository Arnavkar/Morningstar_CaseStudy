<template>
    <div class="news-card-main nice-boxshadow">
        <div class="news-card-section-left">
            <div class="title-container">
                {{ title }}   
            </div>
            <div class="subtitle-container">
                {{ subtitle }}
            </div>
            <div class="read-more-container">
                <a class="read-more-link greyText">Read more</a>
            </div>
        </div>
        <div class="news-card-section-right">
            <img v-if="imageNum == 1" class="news-source-image-wrapper nice-boxshadow" src="../../assets/cnn-icon.png">
            <img v-else-if="imageNum == 2" class="news-source-image-wrapper nice-boxshadow" src="../../assets/wsj-icon.png">
            <img v-else-if="imageNum == 3" class="news-source-image-wrapper nice-boxshadow" src="../../assets/instagram-icon.png">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NewsCard',
        props: {
            title: { type: String },
            subtitle: { type: String },
            source: { type: String },
            imageNum: { type: Number },
        }
    }
</script>

<style scoped lang="scss">

    @import '@mds/fonts';
    @import '@mds/constants';
    @import '@mds/utils-scss';
    @import '@mds/typography';

    .news-card-main {
        @include mds-level-3-heading($bold: true);
        background: white;
        border: 2px solid grey;
        text-align: left;
        border-radius: 5px;
        width: 100%;
        height: 125px;
        margin-top: 15px;
        transition: 0.5s;
        box-shadow: 2px 2px 2px rgba(4,4,4,0.1);
        display: inline-flex;
        justify-content: space-between;
    }

    .news-card-section-left {
        width: 80%;
    }

    .title-container {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .subtitle-container {
        @include mds-level-6-heading($bold: false);
        position: relative;
        bottom: 10px;
        
        padding: 10px;
    }

    .read-more-container {
        @include mds-level-6-heading($bold: false);
        margin-left: 10px;
        margin-top: -5px;
    }

    .read-more-link:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .news-source-image-wrapper {
        height: 100px;
        width: 100px;
        border-radius: 25px;
    }

    .news-card-section-right {
        width: 10%;
        margin: auto;
    }

    .nice-boxshadow {
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07), 
                0 8px 16px rgba(49, 49, 49, 0.07),
    }

    .greyText { color: #7c7c7c;}

</style>