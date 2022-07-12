<template>

    <button class="news-card-main">
        <div class="title-container">
            {{ title }}
            <div class="subtitle-container">
                {{ subtitle }}
            </div>
        </div>
    </button>

</template>

<script>
    export default {
        name: 'NewsCard',
        props: {
            title: { type: String },
            subtitle: { type: String },
            source: { type: String }, 
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
        border-radius: 5px;
        width: 435px;
        height: 125px;
        padding: 15px;
        margin-top: 15px;
        transition: 0.5s;
        box-shadow: 2px 2px 2px rgba(4,4,4,0.1);
        display: inline-flex;
        justify-content: space-between;
    }

    .title-container {
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .subtitle-container {
        @include mds-level-6-heading($bold: false);
        text-align: left;
    }

</style>