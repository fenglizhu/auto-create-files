<template>
    <list id="{频道id}" lid="{二级id}"></list>
</template>

<script>
    export default {
        head() {
            return this.$seo('{标题}', '{关键字}', '{描述}', [{}],'{频道链接}')
        },
        components: {
            list: () => import('~/components/list'),
        },
    }
</script>