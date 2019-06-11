<template>
  <div class="appside">
    <header>
        <router-link v-for="(item,index) in RouterList.RouterList" :key="index" :to='item.path' class='router'>{{item.name}}</router-link>
    </header>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      RouterList: {}
    };
  },
  metheds: {},
  mounted() {
    this.RouterList = this.$store.state;
  }
};
</script>

<style scoped>
header {
  height: calc(100vh - 50px);
  width: 200px;
  background: rgb(182, 181, 181);
  display: flex;
  flex-direction: column;
}
.router {
  padding: 20px;
  color: #fff;
}
.g-login {
  margin-left: auto;
}
</style>
