<template>
  <div>
    Board {{bid}}
    <hr />
    <div v-if="loading">Loading..</div>
    <template v-else>
      <ul>
        <li v-for="(card, index) in cards" :key="index">
          <router-link :to="`/b/${bid}/c/${card}`">card ID is {{card}}</router-link>
        </li>
      </ul>
    </template>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bid: 0,
      cards: [1, 2, 3],
      loading: false
    };
  },
  created() {
    const { bid } = this.$route.params;
    this.bid = bid;
    console.log(bid);
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style>
</style>