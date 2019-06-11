<template>
   <div class="list">
    <router-link to='/'>首页</router-link>
    <cc-button />
    <div @click="getJq">jq按钮</div>
    <p class="one">2222222222222222222222</p>
    <input type="file" id="file">
    <div>{{file}}</div>
  </div>
</template>

<script>
import url from "@/utils/api/list";
import Common from "@/assets/js/common/common";
export default {
  name: "list",
  components: {},
  data() {
    return {
      file: "123    123123"
    };
  },
  created() {},
  mounted() {
    $("#file").on("change", e => {
      this.file = e.currentTarget.files[0];
    });
  },
  methods: {
    async getJq() {
      let res = await this.$http.post(url.signin, { name: "niu", age: 18 });
      // let res = await this.getDataAsync(url.hello, "get");
      console.log(res);
      // 上传图片
      //  let formData = {
      //     file: this.file,
      //     name: 123
      //   };
      //   let res = await this.$uploadFile(url.upload, formData);
      //   console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped >
.one {
  width: 50px;
  @extend .single-line-text;
}
</style>