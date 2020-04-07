<template>
  <div>Board {{bid}}</div>
</template>

<script>
export default {
    data() {
        return {
            bid: 0
        }
    },
    created() {
        const { bid } = this.$route.params;
        this.bid = bid;
        console.log(bid);
    }
}
</script>

<style>

</style>