<template>
    <div :class="{'news-card-main nice-boxshadow': (!was_read && !is_advisor_message),'advisor-card-main nice-boxshadow': (!was_read && is_advisor_message), 'news-card-main-deactivated nice-boxshadow': was_read}">
        <div class="title-container">
            {{ title }}   
        </div>
        <div v-if="!showContent" class="content-container-hidden">
            {{ description.slice(0, 100) }} ...
        </div>
        <div v-if="showContent" class="content-container">
            {{ description }}
        </div>
        <button v-if="showContent == false" @click="showContent = true; playerDataStore.markArticleAsRead(_article_id);;" class="collapsible">
            Read more
        </button>
        <button v-else @click="showContent = false; was_read=true" class="collapsible">
            Read less
        </button>
    </div>
</template>

<script>

    import { playerDataStore } from '@/use/playerDataStore'

    export default {
        name: 'NewsCard',
        props: {
            title: { type: String },
            description: { type: String },
            source: { type: String },
            imageNum: { type: Number },
            _article_id:{type: Number},
            is_advisor_message:{type:Boolean}
        },
        data() {
            return {
                playerDataStore,
                showContent: false,
                was_read: false,
                content: 'A shocking downturn for the media company rears its ugly head as SLTH loses almost $50 billion in market cap value. The company\'s subscriber count continues to fall despite the push for more content.',
            }
        },
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
        border-right: 4px solid red;
        text-align: left;
        border-radius: 5px;
        width: 100%;
        max-height: 300px;
        margin-top: 15px;
        transition: 0.5s;
        box-shadow: 2px 2px 2px rgba(4,4,4,0.1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .news-card-main-deactivated {
        @include mds-level-3-heading($bold: true);
        background: white;
        border: 2px solid grey;
        border-right: 4px solid rgb(175, 172, 172);
        text-align: left;
        border-radius: 5px;
        width: 100%;
        max-height: 300px;
        margin-top: 15px;
        transition: 0.5s;
        box-shadow: 2px 2px 2px rgba(4,4,4,0.1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        opacity:0.9
    }

    .advisor-card-main {
        @include mds-level-3-heading($bold: true);
        background: white;
        border: 2px solid grey;
        border-right: 4px solid green;
        text-align: left;
        border-radius: 5px;
        width: 100%;
        max-height: 300px;
        margin-top: 15px;
        transition: 0.5s;
        box-shadow: 2px 2px 2px rgba(4,4,4,0.1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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

    .collapsible {
        @include mds-body-text-l($bold: false);
        cursor: pointer;
        width: 98%;
        padding-left: 10px;
        color: #909090;
        height: 40px;
        border: none;
        text-align: left;
        background: none;
        border-top: 1px solid #cccccc;
    }

    .content-container-hidden {
        @include mds-body-text-l($bold: false);
        color: black;
        -webkit-mask-image: -webkit-gradient(linear, left top, left bottom, from(rgb(54, 54, 54)), to(rgba(200, 200, 200, 0)));
        height: 50px;
        width: 90%;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
        padding: 0px 10px 0px 10px;
    }

    .content-container {
        @include mds-body-text-l($bold: false);
        height: 100px;
        overflow: hidden;
        width: 90%;
        transition: max-height 0.2s ease-out;
        padding: 0px 10px 10px 10px;
        transition: all ease 0.5;
    }

    .read-more-link:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .nice-boxshadow {
        box-shadow: 0 1px 2px rgba(36, 36, 36, 0.07), 
                0 2px 4px rgba(41, 41, 41, 0.07), 
                0 4px 8px rgba(37, 37, 37, 0.07), 
                0 8px 16px rgba(49, 49, 49, 0.07),
    }

    .greyText { color: #7c7c7c;}

</style>