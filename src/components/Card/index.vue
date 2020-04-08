<template>
  <div>
    <div v-if="loading">loading..</div>
    <div v-else>This is Card {{cid}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cid: 0,
      loading: false
    };
  },

  methods: {
    fetchData() {
      this.loading = true;
      this.cid = this.$route.params.cid;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  },
  watch: {
    $route: {
      handler: "fetchData",
      immediate: true
    }
  }
};
</script>

<style>
</style>